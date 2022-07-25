import React from 'react'
import { containersService } from '../services';
import { ContainersList, NewContainerButton } from '../components';

export function Containers() {
  const [containers, setContainers] = React.useState([]);

  const getContainers = () =>
    containersService.index().then(({ data: { itemsList } }) => setContainers(itemsList));

  React.useEffect(() => getContainers(), []);

  return (
    <>
      <NewContainerButton />
      <h5>Containers</h5>
      <ContainersList containers={containers} />
    </>
  );
}