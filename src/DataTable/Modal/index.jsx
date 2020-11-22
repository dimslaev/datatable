import React, { useContext } from "react";
import { DataTableContext } from "../index";
import cn from "classnames";
import "./index.scss";

export default function Modal({ children }) {
  const { showModal, setShowModal } = useContext(DataTableContext);

  const classes = cn({
    ["datatable-modal"]: true,
    modal: true,
    ["is-active"]: showModal,
  });

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className={classes}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-body">{children}</div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
}
