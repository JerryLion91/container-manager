import React from 'react';
import { Modal } from 'react-responsive-modal';
import { operationsService } from '../services';
import M from 'materialize-css';

export function OperationModal({ operation, showPopup, togglePopup }) {
  const initialvalue = () => {
    const todayISOString = new Date().toISOString();
    const todayDate = todayISOString.split('T')[0];
    return {
      container_id: '',
      type: '',
      startDate: todayDate,
      startTime: '',
      endDate: todayDate,
      endTime: '',
    };
  };
  const [formData, setFormData] = React.useState(initialvalue());
  React.useEffect(() => {
    if (operation)
      setFormData({
        container_id: operation.container_id,
        type: operation.type,
        startDate:
          operation.procedure === 'START' ? operation.date.split('T')[0] : '',
        startTime:
          operation.procedure === 'START'
            ? operation.date.split('T')[1].substr(0, 5)
            : '',
        endDate:
          operation.procedure === 'END' ? operation.date.split('T')[0] : '',
        endTime:
          operation.procedure === 'END'
            ? operation.date.split('T')[1].substr(0, 5)
            : '',
      });
  }, [operation]);
  const handleInputChange = (property, newValue) => {
    setFormData((prev) => ({ ...prev, [property]: newValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validOperation = null;
    if (formData.startTime !== '') {
      const formOperation = {
        type: formData.type,
        procedure: 'START',
        container_id: formData.container_id,
        date: `${formData.startDate}T${formData.startTime}:00`,
      };
      try {
        if (operation) {
          const res = await operationsService.update(
            operation.id,
            formOperation
          );
          console.log(res);
        } else {
          const res = await operationsService.create(formOperation);
          console.log(res);
        }
      } catch (error) {
        M.toast({ html: 'Inicio da movimentacao nao valido' });
      }
      M.toast({ html: 'Inicio da movimentacao criada com sucesso' });
      validOperation = true;
    }
    if (formData.endTime !== '') {
      const formOperation = {
        type: formData.type,
        procedure: 'END',
        container_id: formData.container_id,
        date: `${formData.endDate}T${formData.endTime}:00`,
      };
      try {
        if (operation) {
          const res = await operationsService.update(
            operation.id,
            formOperation
          );
          console.log(res);
        } else {
          const res = await operationsService.create(formOperation);
          console.log(res);
        }
      } catch (error) {
        M.toast({ html: 'Final da movimentacao nao valido' });
      }
      M.toast({ html: 'Final da movimentacao criada com sucesso' });
      validOperation = true;
    }
    if (validOperation) {
      setFormData(initialvalue());
      togglePopup();
    } else {
      M.toast({ html: 'Precencha pelo menos um horario' });
    }
  };

  return (
    <Modal open={showPopup} onClose={togglePopup} center showCloseIcon={false}>
      <form onSubmit={handleSubmit} className="col s12">
        <h5 className="center">Movimentacao</h5>
        <div className="row">
          <div className="input-field col s12">
            <input
              value={formData.container_id}
              onChange={({ target: { value } }) =>
                handleInputChange('container_id', value)
              }
              placeholder="Ex.: TEST1234567"
              id="container_id"
              type="text"
              pattern="[A-Z]{4}\d{7}"
              className="validate"
              required
            />
            <label htmlFor="container_id">Numero do Container</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <select
              className="browser-default"
              value={formData.type}
              onChange={({ target: { value } }) =>
                handleInputChange('type', value)
              }
              required
            >
              <option value="" disabled>
                Tipo de Movimentacao
              </option>
              <option value="BOARDING">Embarque</option>
              <option value="LANDING">Descarga</option>
              <option value="GATE_IN">Gate In</option>
              <option value="GATE_OUT">Gate Out</option>
              <option value="STACK_POSITIONING">Posicionamento Pilha</option>
              <option value="WEIGHING">Pesagem</option>
              <option value="SCANNER">Scanner</option>
            </select>
          </div>
        </div>

        <div className="row">
          <p>Inicio da movimentacao</p>
          <div className="input-field col s6">
            <input
              type="date"
              id="start-date"
              name="trip-start"
              value={formData.startDate}
              onChange={({ target: { value } }) =>
                handleInputChange('startDate', value)
              }
              min="2020-01-01"
              max="2022-12-31"
            />
            <label htmlFor="date">Horario da Operacao</label>
          </div>
          <div className="input-field col s5">
            <input
              value={formData.startTime}
              onChange={({ target: { value } }) =>
                handleInputChange('startTime', value)
              }
              id="start-time"
              type="text"
              pattern="\d{2}:\d{2}"
              className="validate"
            />
            <label htmlFor="time">Horario (HH:mm)</label>
          </div>
        </div>
        <div className="row">
          <p>Fim da movimentacao</p>
          <div className="input-field col s6">
            <input
              type="date"
              id="end-date"
              name="trip-start"
              value={formData.endDate}
              onChange={({ target: { value } }) =>
                handleInputChange('endDate', value)
              }
              min="2020-01-01"
              max="2022-12-31"
            />
            <label htmlFor="date">Horario da Operacao</label>
          </div>
          <div className="input-field col s5">
            <input
              value={formData.endTime}
              onChange={({ target: { value } }) =>
                handleInputChange('endTime', value)
              }
              id="end-time"
              type="text"
              pattern="\d{2}:\d{2}"
              className="validate"
            />
            <label htmlFor="time">Horario (HH:mm)</label>
          </div>
        </div>

        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </Modal>
  );
}
