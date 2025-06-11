import React from "react";
import "./index.scss";

const ReusableTable = ({ columns, data }) => {
  return (
    <div className="reusable-table">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;