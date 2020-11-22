import React from "react";
import "./index.scss";

export function Field({ label, error, children }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">{children}</div>
      {error ? <p className="help is-danger">{error.message}</p> : null}
    </div>
  );
}

export function FieldText({ field, name, forwardRef, defaultValue, error }) {
  const { label } = field;

  return (
    <Field label={label} error={error}>
      <input
        className="input"
        type="text"
        name={name}
        ref={forwardRef}
        defaultValue={defaultValue}
      />
    </Field>
  );
}

export function FieldHidden({ name, forwardRef, defaultValue }) {
  return (
    <input
      type="hidden"
      name={name}
      ref={forwardRef}
      value={defaultValue || ""}
      readOnly={true}
    />
  );
}

export function FieldTextarea({
  field,
  name,
  forwardRef,
  defaultValue,
  error,
}) {
  const { label } = field;

  return (
    <Field label={label} error={error}>
      <textarea
        className="textarea"
        placeholder={label}
        name={name}
        ref={forwardRef}
      >
        {defaultValue}
      </textarea>
    </Field>
  );
}

export function FieldSelect({ field, name, forwardRef, defaultValue, error }) {
  const { label, options } = field;

  return (
    <Field label={label} error={error}>
      <div className="select">
        <select name={name} ref={forwardRef} defaultValue={defaultValue}>
          {options.map((option, index) => (
            <option value={option.id} key={`select-option-${index}`}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </Field>
  );
}
