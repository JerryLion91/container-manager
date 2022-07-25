import React from 'react';
import { OperationModal } from '.';
import { formatDate } from '../utils';

export function ContainersList({ containers }) {

  const totalExport = containers.reduce((acc, op) => acc + (op.category === 'EXPORT' ? 1 : 0), 0);
  const totalImport = containers.reduce((acc, op) => acc + (op.category === 'IMPORT' ? 1 : 0), 0);

  return (
    <>
      {containers.map((c, index) => (
        <div className="row" key={`c${index}`}>
          <div className="col s2">{c.container_id}</div>
          <div className="col s3">{formatDate(c.createdAt)}</div>
          <div className="col s1">{c.type}</div>
          <div className="col s2">{c.status}</div>
          <div className="col s1.5">{c.client}</div>
          <div className="col s1.5">{c.category}</div>
          {/* <a
            className="col s0.5 waves-effect waves-light btn-small"
            onClick={() => {
              setShowOperationPopup({
                operation,
                show: true,
              });
            }}
          >
            <i className="material-icons">edit</i>
          </a> */}
          {/* <a
            className="col s0.5 waves-effect waves-light btn-small"
            onClick={() => handleDelete(operation.id)}
          >
            <i className="material-icons">delete</i>
          </a> */}
        </div>

      ))}
      <hr />
      <div className="row">
        <div className="col s4">Containers: {containers.length}</div>
        <div className="col s4">Total exportacao: {totalExport}</div>
        <div className="col s4">Total importacao: {totalImport}</div>
      </div>
    </>
  )
}

