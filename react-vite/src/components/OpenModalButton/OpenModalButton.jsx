import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  style
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button style={style} onClick={onClick} className='modal-btn'>{buttonText}</button>;
}

export default OpenModalButton;
