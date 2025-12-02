import { useState } from "react";
import axios from "axios";
import { Loader2, Search } from "lucide-react";

const KeywordChecker: React.FC = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateInputs = (): boolean => {
    if (!resumeText.trim() || !jobDesc.trim()) {
      setErrorMsg("Both resume and job description are required.");
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const checkKeywords = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/resume/keywords",
        { resumeText, jobDescription: jobDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMissingKeywords(res.data.missingKeywords || []);
      setErrorMsg(null);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Error checking keywords");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl transition-transform hover:shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Keyword Checker
        </h2>

        {/* Resume Text */}
        <label className="block text-gray-700 font-medium mb-2">Resume Text</label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text here..."
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-green-300 focus:outline-none h-32 resize-none"
        />

        {/* Job Description */}
        <label className="block text-gray-700 font-medium mb-2">Job Description</label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-green-300 focus:outline-none h-32 resize-none"
        />

        {errorMsg && (
          <p className="text-red-500 text-sm mb-3 text-center">{errorMsg}</p>
        )}

        <button
          onClick={checkKeywords}
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white flex items-center justify-center transition
            ${loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" /> Checking...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" /> Check Keywords
            </>
          )}
        </button>

        {/* Results */}
        {missingKeywords.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Missing Keywords</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {missingKeywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {missingKeywords.length === 0 && !loading && resumeText && jobDesc && (
          <p className="text-green-600 mt-4 text-center font-medium">
            All keywords from the job description are present in the resume!
          </p>
        )}
      </div>
    </div>
  );
};

export default KeywordChecker;
