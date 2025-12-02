import { useState } from "react";
import axios from "axios";
import type { Analysis } from "../types";
import { Loader2, UploadCloud } from "lucide-react";

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const maxSizeMB = 5;

    if (!validTypes.includes(file.type)) {
      setErrorMsg("Only PDF or DOCX files are allowed.");
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg(`File size should be less than ${maxSizeMB} MB.`);
      return false;
    }

    setErrorMsg(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Please select a valid file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("http://localhost:4000/api/resume/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalysis(res.data.analysis);
      setErrorMsg(null);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg transition-transform hover:shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Upload Your Resume
        </h2>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-xl py-8 px-4 cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
          <UploadCloud className="w-12 h-12 text-blue-600 mb-3" />
          <p className="text-gray-600 text-sm mb-2">
            Drag & drop your resume here, or click to browse
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx"
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Choose File
          </label>

          {file && (
            <p className="mt-3 text-gray-700 text-sm font-semibold">
              Selected: {file.name}
            </p>
          )}
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm mt-3 text-center">{errorMsg}</p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition flex items-center justify-center 
            ${loading || !file ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" /> Uploading...
            </>
          ) : (
            "Upload & Analyze"
          )}
        </button>

        {/* Show results */}
        {analysis && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              AI Resume Analysis
            </h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-white p-3 rounded-md shadow-inner overflow-auto max-h-64">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
