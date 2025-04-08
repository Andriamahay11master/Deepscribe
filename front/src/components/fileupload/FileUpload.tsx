import { useState } from "react";
import axios from "axios";

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
            setLoading(false);
        }
    }
    return (
        <div>
            <input type="file" accept="image/*, application.pdf" onChange={handleChange} />
            <button onClick={handleUpload} disabled={!file || loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    )
}
export default FileUpload