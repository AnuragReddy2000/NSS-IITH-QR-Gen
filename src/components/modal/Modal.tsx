import React from "react";
import "./Modal.css"

interface ModalProps{
    showModal: boolean;
}

class Modal extends React.Component<ModalProps>{

    render(){
        const showHideClassName = this.props.showModal ? "modal display-block" : "modal display-none";
        return(
            <div className={showHideClassName}>
                <section className="modal-main">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default Modal;