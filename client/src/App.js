import React from 'react';
import M from 'materialize-css';
import 'react-responsive-modal/styles.css';

import ContainerModal from './components/ContainerModal';
import OperationModal from './components/OperationModal';
import FilterForOperations from './components/FilterForOperations';
import OperationsList from './components/OperationsList';
import operationsService from './service/operationsService';
import service from './service/operationsService';

function App() {
  const [filter, setFilter] = React.useState({
    client: '',
    type: '',
  });
  const [operations, setOperations] = React.useState([]);

  const getOperations = () =>
    operationsService.index(filter).then(({ data }) => setOperations(data));

  React.useEffect(() => {
    getOperations();
  }, [filter]);

  const [showContainerPopup, setShowContainerPopup] = React.useState({
    container: undefined,
    show: false,
  });
  const [showOperationPopup, setShowOperationPopup] = React.useState({
    operation: undefined,
    show: false,
  });

  const toggleContainerPopup = () => {
    setShowContainerPopup({
      container: undefined,
      show: !showContainerPopup.show,
    });
  };

  const toggleOperationPopup = () => {
    setShowOperationPopup({
      operation: undefined,
      show: !showOperationPopup.show,
    });
    getOperations();
  };
  const totalExport = operations.reduce(
    (acc, op) => acc + (op.category === 'EXPORT' ? 1 : 0),
    0
  );
  const totalImport = operations.reduce(
    (acc, op) => acc + (op.category === 'IMPORT' ? 1 : 0),
    0
  );
  const handleDelete = (id) => {
    service.remove(id);
    getOperations();
  };

  const uniquesContainers = operations
    .map(({ container_id }) => container_id)
    .filter((value, index, self) => self.indexOf(value) === index).length;
  React.useEffect(() => M.AutoInit(), []);
  return (
    <div className="container center">
      <header>
        <h4>Controle de containers e movimentacoes</h4>
      </header>
      <div className="flex-row">
        <button
          className="btn"
          style={{ margin: '5px' }}
          onClick={toggleContainerPopup}
        >
          + Novo Container
        </button>
        <button
          className="btn"
          style={{ margin: '5px' }}
          onClick={toggleOperationPopup}
        >
          + Nova Movimentacao
        </button>
      </div>
      <ContainerModal
        showPopup={showContainerPopup.show}
        container={showContainerPopup.container}
        togglePopup={toggleContainerPopup}
      />
      <OperationModal
        showPopup={showOperationPopup.show}
        operation={showOperationPopup.operation}
        togglePopup={toggleOperationPopup}
      />
      <h5>Movimentacoes</h5>
      <FilterForOperations
        operations={operations}
        filter={filter}
        setFilter={setFilter}
      />
      <OperationsList
        operations={operations}
        handleDelete={handleDelete}
        setShowOperationPopup={setShowOperationPopup}
      />
      <hr />
      <div className="row">
        <div className="col s4">Containers: {uniquesContainers}</div>
        <div className="col s4">Total exportacao: {totalExport}</div>
        <div className="col s4">Total importacao: {totalImport}</div>
      </div>
    </div>
  );
}

export default App;
