import { createContext, useContext, useEffect, useState } from "react";

//TODO:Set the types for setLoading
const TableContext = createContext<null | {
    tableNo: string;
    setTableNo: React.Dispatch<React.SetStateAction<string>>;
    tableId: string;
    setTableId: React.Dispatch<React.SetStateAction<string>>;
}>(null);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [tableNo, setTableNo] = useState("");
  const [tableId, setTableId] = useState("");

  useEffect(() => {
    const localValueId = localStorage.getItem("tableId");
    const localValueNo = localStorage.getItem("tableNo");
    if (localValueNo) {
      setTableNo(localValueNo);
    }
    if (localValueId) {
      setTableId(localValueId);
    }
  }, []);



  useEffect(() => {
    localStorage.setItem("tableId", tableId);
    localStorage.setItem("tableNo", tableNo);
  }, [tableId, tableNo]);

  return (
    <TableContext.Provider value={{ tableNo, setTableNo, tableId, setTableId }}>
      {children}
    </TableContext.Provider>
  );
};

export default function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
}
