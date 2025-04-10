import easyocr

reader = easyocr.Reader(['en'])  # use gpu=False if needed

def extract_text_from_image(image_path: str) -> str:
    print("[DEBUG] Reading image at:", image_path)
    try:
        results = reader.readtext(image_path, detail=2)
        extracted_text = "\n".join([item[1] for item in results])
        print("[DEBUG] Extracted:", extracted_text)
        return extracted_text
    except Exception as e:
        print("[ERROR] OCR failed:", str(e))
        return "OCR extraction failed"
