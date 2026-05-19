// import { createContext, useContext, useState, ReactNode } from "react";

// interface TableContextType {
//   tableNo: number | null;
//   setTableNo: (tableNo: number | null) => void;
//   clearTable: () => void;
// }

// const TableContext = createContext<TableContextType | undefined>(undefined);

// export const TableProvider = ({ children }: { children: ReactNode }) => {
//   const [tableNo, setTableNo] = useState<number | null>(() => {
//     const stored = sessionStorage.getItem("tableNo");
//     return stored ? Number(stored) : null;
//   });

//   const handleSetTableNo = (no: number | null) => {
//     setTableNo(no);
//     if (no !== null) {
//       sessionStorage.setItem("tableNo", String(no));
//     } else {
//       sessionStorage.removeItem("tableNo");
//     }
//   };

//   const clearTable = () => handleSetTableNo(null);

//   return (
//     <TableContext.Provider value={{ tableNo, setTableNo: handleSetTableNo, clearTable }}>
//       {children}
//     </TableContext.Provider>
//   );
// };

// const useTableContext = () => {
//   const context = useContext(TableContext);
//   if (!context) {
//     throw new Error("useTableContext must be used within a TableProvider");
//   }
//   return context;
// };

// export default useTableContext;
 

import { createContext, useContext, useState } from "react";

const TableContext = createContext<null | {
  tableId: string | null;
  saveTableId: (id: string) => void;
  clearTable: () => void;
}>(null);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize from localStorage so the table sticks around during their meal
  const [tableId, setTableId] = useState<string | null>(() => {
    return localStorage.getItem("TABLE_ID");
  });

  const saveTableId = (id: string) => {
    setTableId(id);
    localStorage.setItem("TABLE_ID", id);
  };

  const clearTable = () => {
    setTableId(null);
    localStorage.removeItem("TABLE_ID");
  };

  return (
    <TableContext.Provider value={{ tableId, saveTableId, clearTable }}>
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