import React, { useContext } from "react";
import { DataTableContext } from "../index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldText, FieldHidden, FieldTextarea, FieldSelect } from "./Fields";
import "./index.scss";

export default function Form() {
  const {
    schema,
    columns,
    rows,
    formType,
    editingRowIndex,
    setShowModal,
    setFormType,
    onSubmitEditRow,
    onSubmitNewRow,
  } = useContext(DataTableContext);

  const form = useForm({ resolver: yupResolver(schema) });
  const { register, handleSubmit, errors, control } = form;

  const onCancel = () => {
    setShowModal(false);
    setFormType(null);
  };

  const onSubmit = (values) => {
    if (formType === "edit") {
      onSubmitEditRow(editingRowIndex, values);
    }
    if (formType === "add-new") {
      onSubmitNewRow(values);
    }
    onCancel();
  };

  let rowData = null;

  if (formType === "edit") {
    rowData = getExistingRowData(rows, editingRowIndex);
  }

  if (formType === "add-new") {
    rowData = getNewRowData(columns);
  }

  if (!rowData) return null;

  return (
    <form className="datatable-form" onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(rowData).map((key, index) => {
        const value = rowData[key];
        const field = columns[index];
        const { type } = field;
        const commonProps = {
          key: `datatable-form-${key}`,
          field,
          name: key,
          defaultValue: value,
          error: errors[key],
        };

        switch (type) {
          case "text":
            return <FieldText {...commonProps} forwardRef={register} />;
          case "hidden":
            return <FieldHidden {...commonProps} forwardRef={register} />;
          case "textarea":
            return <FieldTextarea {...commonProps} forwardRef={register} />;
          case "select":
            return <FieldSelect {...commonProps} forwardRef={register} />;
          default:
            return <FieldText {...commonProps} forwardRef={register} />;
        }
      })}

      <div className="form-actions mt-6">
        <button
          className="button is-link mr-2"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button className="button is-link" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

const getExistingRowData = (rows, editingRowIndex) => {
  return editingRowIndex === -1 ? null : rows[editingRowIndex];
};

const getNewRowData = (columns) => {
  const newRow = {};

  columns.forEach(({ id, type }) => {
    let initialValue = null;

    if (type === "multi-select") {
      initialValue = [];
    }

    newRow[id] = initialValue;
  });

  return newRow;
};
