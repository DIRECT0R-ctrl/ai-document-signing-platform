from fastapi import FastAPI, File, UploadFile, HTTPException
import fitz  # PyMuPDF for OCR/Text extraction
import re

app = FastAPI(title="AUI Document AI Engine", version="1.0.0")

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """ Acts as the OCR Layer: Converts PDF bytes into raw text strings """
    text = ""
    # Open the PDF directly from memory bytes
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def run_nlp_analysis(text: str):
    """ Acts as the NLP Layer: Parses raw text to extract structured intelligence """
    # Simple normalized text for easier regex parsing
    normalized_text = text.lower()
    
    # 1. Classify Document Type
    doc_type = "Unknown Academic Document"
    if "memorandum" in normalized_text or "mou" in normalized_text:
        doc_type = "Memorandum of Understanding (MOU)"
    elif "internship" in normalized_text or "convention de stage" in normalized_text:
        doc_type = "Internship Agreement"
    elif "transcript" in normalized_text or "relevé de notes" in normalized_text:
        doc_type = "Official Academic Transcript"

    # 2. Extract Potential Parties (Looking for AUI Schools or corporate terms)
    parties = []
    if "al akhawayn" in normalized_text or "aui" in normalized_text:
        parties.append("Al Akhawayn University")
    if "school of science" in normalized_text or "sse" in normalized_text:
        parties.append("School of Science and Engineering (SSE)")
    if "school of business" in normalized_text or "sba" in normalized_text:
        parties.append("School of Business Administration (SBA)")
        
    # Look for corporate indicators for external parties
    corporate_match = re.search(r'(?:with|between)\s+([A-Z][A-Za-z0-9\s\,]+)(?:\s+and|\s+has)', text)
    if corporate_match:
        parties.append(corporate_match.group(1).strip())

    # 3. Extract Key Risk/Important Clauses
    clauses = []
    if "liability" in normalized_text or "responsabilité" in normalized_text:
        clauses.append("Liability Shift/Limitation Clause Detected")
    if "termination" in normalized_text or "résiliation" in normalized_text:
        clauses.append("Contract Termination/Exit Protocol Detected")
    if "confidential" in normalized_text or "secret" in normalized_text:
        clauses.append("Non-Disclosure / Confidentiality Obligation")

    return {
        "document_type": doc_type,
        "extracted_metadata": {
            "parties": list(set(parties)),
            "detected_clauses": clauses,
            "word_count": len(text.split()),
        },
        "confidence_score": 95.50 if len(clauses) > 0 else 80.00
    }

@app.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    """ API Endpoint that Laravel will call """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        # Read raw uploaded file bytes
        file_bytes = await file.read()
        
        # Run through the pipeline
        raw_text = extract_text_from_pdf(file_bytes)
        
        if not raw_text.strip():
            raise HTTPException(status_code=422, detail="OCR failed to extract readable text from PDF.")
            
        ai_analysis_results = run_nlp_analysis(raw_text)
        return ai_analysis_results
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Pipeline Crash: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Boot the python server locally on port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
