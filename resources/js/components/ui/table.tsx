import React from "react";

interface TableProps {
  columns: string[];
  data: { [key: string]: any }[];
actions?: (item: any) => JSX.Element;
 }

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="border p-3 text-left">{col}</th>
            ))}
            {actions && <th className="border p-3 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="border hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="border p-3">{item[col]}</td>
                ))}
                {actions && <td className="border p-3">{actions(item)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="p-3 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
