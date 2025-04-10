import easyocr
from PIL import Image

# Load EasyOCR Reader (you can specify multiple languages like ['en', 'fr'] if needed)
reader = easyocr.Reader(['en'], gpu=True)  # Set gpu=False if you don't have CUDA

def extract_text_from_image(image_path: str) -> str:
    print("[DEBUG] Loading image for OCR:", image_path)
    results = reader.readtext(image_path, detail=0)
    
    extracted_text = "\n".join(results)
    print("[DEBUG] Extracted text:", extracted_text)
    return extracted_text
