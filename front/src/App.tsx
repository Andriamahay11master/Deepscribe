import { useState } from 'react'
import './App.scss'
import FileUpload from './components/fileupload/FileUpload'
import OutputBox from './components/outbutbox/OutputBox';

function App() {
  const [extractedText, setExtractedText] = useState('');

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📝 DeepScribe</h1>
      <FileUpload onTextExtract={setExtractedText} />
      {extractedText && <OutputBox text={extractedText} />}
    </div>
  );
}

export default App
