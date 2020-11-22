import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import Table from "./Table";
import Form from "./Form";
import Modal from "./Modal";
import "./index.scss";

export const DataTableContext = createContext(null);

export default function DataTable(props) {
  const { columns, rows, setRows, onSaveRows, schema } = props;
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("edit");

  const onAddNewRow = () => {
    setFormType("add-new");
    setShowModal(true);
  };

  const onSubmitNewRow = (newRow) => {
    const newRows = [...rows, newRow];
    setRows(newRows);
  };

  const onEditRow = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setFormType("edit");
    setShowModal(true);
  };

  const onSubmitEditRow = (rowIndex, values) => {
    const orderedValues = {};
    columns.forEach(({ id }) => (orderedValues[id] = values[id] || null));

    const newRows = rows.slice();
    newRows[rowIndex] = orderedValues;

    setRows(newRows);
  };

  const onDeleteRow = (rowIndex) => {
    setRows(rows.filter((row, index) => index !== rowIndex));
  };

  if (!columns || !rows) return null;

  return (
    <DataTableContext.Provider
      value={{
        columns,
        rows,
        setRows,
        onSaveRows,
        schema,
        editingRowIndex,
        showModal,
        formType,
        setEditingRowIndex,
        setShowModal,
        setFormType,
        onAddNewRow,
        onSubmitNewRow,
        onEditRow,
        onSubmitEditRow,
        onDeleteRow,
      }}
    >
      <Table />
      <Modal>
        <Form />
      </Modal>
    </DataTableContext.Provider>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  setRows: PropTypes.func.isRequired,
  onSaveRows: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
};
