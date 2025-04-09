import { useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";

interface FileUploadProps {
    onTextExtract: (text: string) => void
}
const FileUpload = ({onTextExtract}: FileUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) setFile(files[0]);
    }

    const reinitInput = () => {
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (input) {
            input.value = '';
            setFile(null);
        }
    }

    const handleUpload = async () => {
        if(!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onTextExtract(response.data.text);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            reinitInput();
            setLoading(false);
        }
    }
    return (
        <div className="main-page">
            {loading && <Loader />}
            <div className="main-body form-model">
                <div className="form-group">
                    <input type="file" accept="image/*, application.pdf" onChange={handleChange} />                
                </div>
                <div className="form-group form-button">
                    <button onClick={handleUpload} disabled={!file || loading} className="btn btn-primary">
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default FileUpload