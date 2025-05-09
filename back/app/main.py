from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import shutil
import os
from .easy_model import extract_text_from_image
import uuid

app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
def upload_file(file: UploadFile = File(...)) -> Dict[str, str]:
    #generate safe filename, replace spaces, accents and file name can be any format
    safe_filename = f"{uuid.uuid4().hex}-{file.filename.replace(' ', '_').replace('.', '_')}"
    temp_path = os.path.join(UPLOAD_DIR, safe_filename)

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_image(temp_path)

    os.remove(temp_path)  # Cleanup after processing
    return {"text": extracted_text}
