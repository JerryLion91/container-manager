import React from 'react';
import { OperationModal } from '.';

export function OperationsList({
  operations,
  handleDelete,
  getOperations,
}) {

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
    <div className="col s12">
      <OperationModal
        showPopup={showOperationPopup.show}
        operation={showOperationPopup.operation}
        togglePopup={toggleOperationPopup}
      />
      {operations
        .sort((a, b) => a.category.localeCompare(b.category))
        .sort((a, b) => a.type.localeCompare(b.type))
        .map((operation, index) => {
          return (
            <div className="row" key={`op${index}`}>
              <div className="col s2">{operation.container_id}</div>
              <div className="col s3">{formatDate(operation.date)}</div>
              <div className="col s1">{operation.procedure}</div>
              <div className="col s2">{operation.type}</div>
              <div className="col s1.5">{operation.client}</div>
              <div className="col s1.5">{operation.category}</div>
              <a
                className="col s0.5 waves-effect waves-light btn-small"
                onClick={() => {
                  setShowOperationPopup({
                    operation,
                    show: true,
                  });
                }}
              >
                <i className="material-icons">edit</i>
              </a>
              <a
                className="col s0.5 waves-effect waves-light btn-small"
                onClick={() => handleDelete(operation.id)}
              >
                <i className="material-icons">delete</i>
              </a>
            </div>
          );
        })}
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
}
