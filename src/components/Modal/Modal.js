import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalBackdrop, ModalContainer, CloseButton } from "./Modal.styled";
import { ReactComponent as CloseIcon } from "../../images/cross.svg";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        console.log("escape pressed");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={handleBackDropClick}>
      <CloseButton type="button" aria-label="close modal">
        <CloseIcon width="30" height="30" fill="fff" onClick={onClose} />
      </CloseButton>
      <ModalContainer>
        <img src={largeImageURL} alt="" width="800" />
      </ModalContainer>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propType = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
