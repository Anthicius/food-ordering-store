import React, {Fragment} from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideCart}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children} </div>
    </div>
  );
};

const protalElement = document.getElementById("overlays")

const Modal = (props) => {
  return <Fragment>
    {createPortal(<Backdrop onHideCart={props.onHideCart}/>, protalElement)}
    {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, protalElement)}
  </Fragment>
};

export default Modal;
