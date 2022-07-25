import React from 'react'
import { operationsService } from '../services';
import { OperationsList, FilterForOperations, FlexRow, NewOperationButton } from '../components';

export function Operations() {
  const [operations, setOperations] = React.useState([]);

  const [filter, setFilter] = React.useState({
    client: '',
    type: '',
  });

  const getOperations = () =>
    operationsService.index(filter).then(({ data }) => setOperations(data));

  React.useEffect(() => getOperations(), [filter]);

  const handleDelete = (id) => {
    operationsService.remove(id);
    getOperations();
  };

  return (
    <>
      <FlexRow>
        <NewOperationButton getOperations={getOperations} />
      </FlexRow>
      <h5>Movimentações</h5>
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
    </>
  );
}