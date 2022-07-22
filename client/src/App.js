import React from 'react';
import M from 'materialize-css';
import 'react-responsive-modal/styles.css';

import { operationsService } from './services';
import { Header, OperationsList, FilterForOperations, FlexRow, NewContainerButton, NewOperationButton } from './components';

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

  const totalExport = operations.reduce(
    (acc, op) => acc + (op.category === 'EXPORT' ? 1 : 0),
    0
  );
  const totalImport = operations.reduce(
    (acc, op) => acc + (op.category === 'IMPORT' ? 1 : 0),
    0
  );
  const handleDelete = (id) => {
    operationsService.remove(id);
    getOperations();
  };

  const uniquesContainers = operations
    .map(({ container_id }) => container_id)
    .filter((value, index, self) => self.indexOf(value) === index).length;
  React.useEffect(() => M.AutoInit(), []);

  return (
    <div className="container center">
      <Header />
      <FlexRow>
        <NewContainerButton />
        <NewOperationButton getOperations={getOperations} />
      </FlexRow>
      <h5>Movimentacoes</h5>
      <FilterForOperations
        operations={operations}
        filter={filter}
        setFilter={setFilter}
      />
      <OperationsList
        operations={operations}
        handleDelete={handleDelete}
        getOperations={getOperations}
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
