interface OutputProps {
    text: string
}
const OutputBox = ({text}: OutputProps) => {
    return (
        <div className="mt-6 p-4 border rounded-xl bg-gray-50 shadow-inner">
            <h2 className="text-xl font-semibold mb-2">Extracted Text</h2>
            <textarea
                value={text}
                readOnly
                className="w-full h-64 p-2 border rounded text-gray-700 font-mono bg-white"
            />
        </div>
    )
}
export default OutputBox