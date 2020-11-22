import React, { useState, useEffect } from "react";
import DataTable from "./DataTable/index";
import { entitySchema, entityColumns } from "./exampleEntitySchema";
import "./style.scss";

export default function App() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("./exampleEntityItems.json")
      .then((res) => res.json())
      .then((items) => {
        setRows(reorderItemProperties(items, entityColumns));
      });
  }, []);

  const onSaveRows = () => {
    alert(JSON.stringify(rows));
  };

  return (
    <div className="app container pt-6">
      <section className="hero mb-3">
        <h1 className="title">DataTable</h1>
        <h2 className="subtitle">
          Simple datatable with schema validation for React.
        </h2>
      </section>

      {rows.length ? (
        <DataTable
          columns={entityColumns}
          rows={rows}
          setRows={setRows}
          onSaveRows={onSaveRows}
          schema={entitySchema}
        />
      ) : null}
    </div>
  );
}

// Reorders the item properties based on
// the order of the entityColumns
const reorderItemProperties = (items, entityColumns) => {
  return items.map((item) => {
    const row = {};
    entityColumns.forEach((column) => {
      const { id } = column;
      row[id] = item[id];
    });
    return row;
  });
};
