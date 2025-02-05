import React from 'react';

const Table = ({ data, columns }) => {
    return (
        <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
            <tr>
                {columns.map((col, index) => (
                    <th key={index}>{col}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                        데이터가 없습니다.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default Table;
