import React, { useContext } from "react";
import { DataTableContext } from "../index";
import cn from "classnames";
import "./index.scss";

export default function Table() {
  const { rows, onAddNewRow, onSaveRows } = useContext(DataTableContext);

  if (!rows || !rows.length) return null;

  return (
    <div className="datatable">
      <table className="datatable-table table is-fullwidth is-hoverable is-bordered">
        <thead>
          <DataTableHeaderRow />
        </thead>

        <tbody>
          {rows.map((rowData, index) => (
            <DataTableBodyRow
              key={`datatable-tr-${index}`}
              rowData={rowData}
              rowIndex={index}
            />
          ))}
        </tbody>
      </table>

      <div className="datatable-actions">
        <button className="button is-link" onClick={onAddNewRow}>
          Add new
        </button>
        <button className="button is-link" onClick={onSaveRows}>
          Save changes
        </button>
      </div>
    </div>
  );
}

function DataTableHeaderRow() {
  const { columns } = useContext(DataTableContext);

  return (
    <tr>
      <td className="datatable-col-actions">Actions</td>

      {columns.map(({ id, label }) => (
        <td key={`datatable-th-${id}`} className={`datatable-col-${id}`}>
          {label}
        </td>
      ))}
    </tr>
  );
}

function DataTableBodyRow({ rowData, rowIndex }) {
  const { onEditRow, onDeleteRow, editingRowIndex } = useContext(
    DataTableContext
  );

  const onEdit = (rowIndex) => () => {
    onEditRow(rowIndex);
  };

  const onDelete = (rowIndex) => () => {
    onDeleteRow(rowIndex);
  };

  const classes = cn({
    ["has-background-link-light"]: rowIndex === editingRowIndex,
  });

  return (
    <tr className={classes}>
      <td className="datatable-col-actions">
        <button className="button is-small" onClick={onEdit(rowIndex)}>
          Edit
        </button>

        <button className="button is-small" onClick={onDelete(rowIndex)}>
          Delete
        </button>
      </td>

      {Object.keys(rowData).map((key, index) => {
        const value = rowData[key];
        const values = Array.isArray(value) && value.length ? value : [value];

        return (
          <td key={`datatable-td-${key}`} className={`datatable-col-${key}`}>
            {values.map((value) => (
              <span key={`datatable-td-${key}-${index}`}>{value}</span>
            ))}
          </td>
        );
      })}
    </tr>
  );
}
