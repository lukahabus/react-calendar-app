import styled from "styled-components";

const ModalBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  background-color: white;
  margin: auto;
  padding: 20px;
  width: 50%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-width: 300px;

  /* Centering the modal correctly */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  button {
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`;


export const Modal = ({ children, shouldShow, onRequestClose }) => {
  return (
    <>
      {shouldShow && (
        <ModalBackground onClick={onRequestClose}>
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <button onClick={onRequestClose}>X</button>
            {children}
          </ModalBody>
        </ModalBackground>
      )}
    </>
  );
};
