import React from 'react'
import { OperationModal } from '.';

export function NewOperationButton({ getOperations }) {

  const [showOperationPopup, setShowOperationPopup] = React.useState({
    operation: undefined,
    show: false,
  });

  const toggleOperationPopup = () => {
    setShowOperationPopup({
      operation: undefined,
      show: !showOperationPopup.show,
    });
    getOperations();
  };

  return (
    <>
      <button
        className="btn"
        style={{ margin: '5px' }}
        onClick={toggleOperationPopup}
      >
        + Nova Movimentacao
      </button>
      <OperationModal
        showPopup={showOperationPopup.show}
        operation={showOperationPopup.operation}
        togglePopup={toggleOperationPopup}
      />
    </>
  )
}
