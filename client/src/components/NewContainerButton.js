import React from 'react'
import { ContainerModal } from '.';

export function NewContainerButton() {

  const [showContainerPopup, setShowContainerPopup] = React.useState({
    container: undefined,
    show: false,
  });

  const toggleContainerPopup = () => {
    setShowContainerPopup({
      container: undefined,
      show: !showContainerPopup.show,
    });
  };

  return (
    <>
      <button
        className="btn"
        style={{ margin: '5px' }}
        onClick={toggleContainerPopup}
      >
        + Novo Container
      </button>
      <ContainerModal
        showPopup={showContainerPopup.show}
        container={showContainerPopup.container}
        togglePopup={toggleContainerPopup}
      />
    </>
  )
}
