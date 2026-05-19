import { useEffect, useState } from "react";
import { getAllTables } from "../../api/table";
import { Loading } from "../../components";
import { QRCode } from "react-qrcode-logo"; // Upgraded library for advanced styling

// Define the updated structure coming from the database backend
type TableType = {
  _id: string;
  table_no: string;
  qrToken: string;
};

function QRCodes() {
  const [tables, setTables] = useState<TableType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllTables()
      .then((res) => setTables(res.data))
      .catch((err) => console.error("Error loading admin tables:", err))
      .finally(() => setLoading(false));
  }, []);

  // Compute base client domain dynamically (safely drops /admin segments)
  const getBaseUrl = () => {
    const currentUrl = window.location.origin; // e.g., http://localhost:5173 or https://mysite.com
    return `${currentUrl}/scan?token=`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Admin Control Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5 print:hidden">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Table QR Engine</h1>
          <p className="text-sm text-gray-500 mt-1">Generate, preview, and print restaurant dynamic QR tags.</p>
        </div>
        <button
          onClick={handlePrint}
          className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Print All Sheets
        </button>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 print:grid-cols-2 print:gap-12">
        {tables.map((table) => {
          const qrPayload = `${getBaseUrl()}${table.qrToken}`;

          return (
            <div
              key={table._id}
              className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl p-6 flex flex-col items-center justify-center transition-all duration-300 relative group overflow-hidden break-inside-avoid print:shadow-none print:border-2 print:border-gray-300 print:rounded-2xl"
            >
              {/* Subtle Aesthetic Ring for Design */}
              <div className="absolute top-0 left-0 w-full h-2 bg-green-500 print:hidden" />

              {/* Table Descriptor Label */}
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full print:bg-transparent print:p-0">
                  RESTAURANT TABLE
                </span>
                <h2 className="text-4xl font-black text-gray-800 mt-1">{table.table_no}</h2>
              </div>

              {/* Advanced Styled QR Code */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:border-green-200 transition-colors duration-300 print:bg-white print:border-0 print:p-0">
                <QRCode
                  value={qrPayload}
                  size={180}
                  qrStyle="dots"                // Stylized dot composition matrix
                  eyeColor="#16a34a"            // Tailored emerald green matching branding
                  eyeRadius={8}                 // Smooth, curved contemporary corners
                  bgColor="#ffffff"
                  fgColor="#1f2937"             // Slate grey for crisp high-contrast scanning
                  logoPaddingStyle="circle"
                  // To include a central brand image asset, uncomment the lines below:
                  // logoImage="https://imgs.search.brave.com/nhOCL14AixP6CVXl_lPXPdcIg9SAN08JzLcvCeTIyWQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTI2/NjUzMjEyL3Bob3Rv/L2FueS1zdXBwb3J0/LXdvdWxkLWJlLWFw/cHJlY2lhdGVkLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1X/Q20yalB0d3F5c3NN/M0VTbHdMZEpxU21T/MklKaGMwNC1pVHJh/NWVYempvPQ" // Ensure this path is correct and the image is optimized for QR embedding
                  // logoWidth={40}
                  // logoPadding={4}
                />
              </div>

              {/* Quick Instruction Footer Helper */}
              <p className="text-xs text-gray-400 mt-6 font-medium text-center tracking-wide print:text-gray-600">
                Scan to explore menu & place order
              </p>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-24">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default QRCodes;