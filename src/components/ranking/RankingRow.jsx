import React from "react";

const RankingRow = ({ rank, name, selectedCount }) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>{name}</td>
      <td>{selectedCount}</td>
    </tr>
  );
};

export default RankingRow;
