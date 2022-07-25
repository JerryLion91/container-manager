import React from 'react';
import { Modal } from 'react-responsive-modal';
import { containersService } from '../services';
import M from 'materialize-css';

export function ContainerModal({
  container = {
    container_id: '',
    client: '',
    type: '',
    status: '',
    category: '',
  },
  showPopup,
  togglePopup,
}) {
  const [formData, setFormData] = React.useState(container);
  const handleInputChange = (property, newValue) => {
    setFormData((prev) => ({ ...prev, [property]: newValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await containersService.create(formData);
      console.log(res);
      M.toast({ html: 'Container criado com sucesso' });
      setFormData({
        container_id: '',
        client: '',
        type: '',
        status: '',
        category: '',
      });
      togglePopup();
    } catch (error) {
      if (error.response.data.error === 'Container already created')
        M.toast({ html: 'Container ja consta no banco de dados' });
      else M.toast({ html: 'Erro' });
    }
  };

  return (
    <Modal open={showPopup} onClose={togglePopup} center showCloseIcon={false}>
      <form onSubmit={handleSubmit} className="col s12">
        <h5 className="center">Movimentacao</h5>
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
        <div className="input-field col s12">
          <input
            value={formData.client}
            onChange={({ target: { value } }) =>
              handleInputChange('client', value)
            }
            id="client"
            type="text"
            className="validate"
            required
          />
          <label htmlFor="client">Cliente</label>
        </div>
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
              Tipo do container
            </option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </div>
        <div className="input-field col s12">
          <select
            className="browser-default"
            value={formData.status}
            onChange={({ target: { value } }) =>
              handleInputChange('status', value)
            }
            required
          >
            <option value="" disabled>
              Status do container
            </option>
            <option value="FULL">Cheio</option>
            <option value="EMPTY">Vazio</option>
          </select>
        </div>
        <div className="input-field col s12">
          <select
            className="browser-default"
            value={formData.category}
            onChange={({ target: { value } }) =>
              handleInputChange('category', value)
            }
            required
          >
            <option value="" disabled>
              Categoria
            </option>
            <option value="IMPORT">Importacao</option>
            <option value="EXPORT">Exportacao</option>
          </select>
        </div>
        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </Modal>
  );
}
