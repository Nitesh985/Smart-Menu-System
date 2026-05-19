import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useTableContext from "../../context/TableContext";
import { Loading } from "../../components"; 
import { verifyQRToken } from "../../api/table"; // Wired up your real API module

function IndexPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveTableId } = useTableContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Captures the static identifier from: /scan?token=A1_xxxxxxxxxx
    const token = searchParams.get("token"); 

    if (!token) {
      setError("Invalid or missing QR code session parameters.");
      return;
    }

    const handleTableVerification = async () => {
      try {
        // 1. Send token hash to backend for validation
        const response = await verifyQRToken(token);
        
        // 2. Extract the actual table display name (e.g., "A1") 
        // Note: Use response.tableId if you prefer saving the database ObjectId instead
        const actualTableNo = response?.data?.tableId;
        console.log(response)

        // 3. Commit to local context & storage so it updates your Checkout page instantly
        saveTableId(actualTableNo);

        // 4. Redirect seamlessly to clean root menu path
        navigate("/", { replace: true });
      } catch (err: any) {
        console.error("Backend error verifying table token:", err);
        // Fallback error copy from server message if available
        setError(err?.message || "Could not resolve table session. Please try scanning again.");
      }
    };

    handleTableVerification();
  }, [searchParams, saveTableId, navigate]);

  // 1. Verification Error State UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-sm border border-gray-100">
          <p className="text-red-500 font-bold text-lg">Scan Error</p>
          <p className="text-gray-500 mt-2 text-sm">{error}</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go to Main Menu
          </button>
        </div>
      </div>
    );
  }

  // 2. Active Verification Progress State UI
  return (
    // Fixed string syntax bug on your original bg-gray-50 wrapper tag
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loading />
      <p className="text-gray-500 font-medium mt-4 animate-pulse text-sm">
        Verifying your table session...
      </p>
    </div>
  );
}

export default IndexPage;