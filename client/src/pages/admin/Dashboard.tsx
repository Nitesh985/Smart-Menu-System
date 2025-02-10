import React, { useEffect, useRef, useState } from "react";
import { getAllTables } from "../../api/table";
import { Loading, QRCode } from "../../components";

type TableType = {
  _id: string;
  table_no: string;
};

function Dashboard() {
  const [tables, setTables] = useState<TableType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllTables()
      .then((res) => setTables(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-10 p-5" >
        {tables.map((table) => (
          <div className="border w-[300px] h-[400px] flex flex-col justify-center items-center" >
            <p className="text-3xl text-center font-bold text-orange-600 mb-5" >{table.table_no}</p>
            <QRCode url={window.location.href.split("admin")[0] + "data?id=" + table._id} />
          </div>
        ))}
      </div>
      {/* <QRCodeSVG
      title="qr"
      value={window.location.href.split("admin")[0] + `data?id=67906f8be6a0ce8e691c0be6`}
       />
      <QRCode
      logoPaddingStyle='circle'
      qrStyle='dots'
      eyeColor="green"
      eyeRadius={10}
      fgColor='black'
      removeQrCodeBehindLogo={true}
      logoImage={qrLogo}
      logoPadding={3}
      value={window.location.href.split("admin")[0] + `data?id=67906f8be6a0ce8e691c0be6`} />
      <div className="flex" >
      {tables.map(table=>
        <QRCode

            value={window.location.href.split("/admin")[0] + `data?id=${table._id}:${Date.now().toString()}:`}
          />
        )}
        </div> */}
      <div className="divider"></div>
      {loading && <Loading />}
    </div>
  );
}

export default Dashboard;
