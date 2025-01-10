interface TableProps{
    rows: Array<any>,
    children: React.ReactNode;
    tableRowStyles?: string;
}


function Table({rows=[], children, tableRowStyles}:TableProps) {

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className={`flex ${tableRowStyles}`} >
            <th></th>
            {rows.map(data=>(
                <th key={data}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
