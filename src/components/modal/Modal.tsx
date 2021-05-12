import React from "react";
import "./Modal.css"

class Modal extends React.Component{

    render(){
        return(
            <div className="modal display-block">
                <section className="modal-main">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default Modal;