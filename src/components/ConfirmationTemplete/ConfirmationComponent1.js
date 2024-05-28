import React from "react";

const ConfirmationComponent1 = ({
  Heading,
  message,
  onConfirm,
  onCancel,
  diaableButton,
}) => {
  return (
    <div className="confirmation-popup">
      <h4>{Heading}</h4>
      <p>{message}</p>
      <button onClick={onConfirm} disabled={diaableButton}>
        Confirm
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmationComponent1;
