import React from 'react';

export function FilterForOperations({ operations, filter, setFilter }) {
  const [clients, setClients] = React.useState([]);
  React.useEffect(() => {
    operations &&
      setClients(
        operations
          .map(({ client }) => client)
          .filter((value, index, self) => self.indexOf(value) === index)
      );
  }, [operations]);
  const handleInputChange = (property, newValue) => {
    setFilter({ ...filter, [property]: newValue });
  };

  return (
    <div className="row">
      <div className="input-field col s6">
        <select
          className="browser-default"
          value={filter.client}
          onChange={({ target: { value } }) =>
            handleInputChange('client', value)
          }
          required
        >
          <option value="" disabled>
            Cliente
          </option>
          {clients.map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      <div className="input-field col s6">
        <select
          className="browser-default"
          value={filter.type}
          onChange={({ target: { value } }) => handleInputChange('type', value)}
          required
        >
          <option value="" disabled>
            Tipo de movimentacao
          </option>
          <option value="FULL">Cheio</option>
          <option value="EMPTY">Vazio</option>
        </select>
      </div>
    </div>
  );
}
