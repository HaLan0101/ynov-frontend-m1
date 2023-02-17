import React from 'react';
import styles from "./index.module.scss";
import Button from "../Button"
const Index = (props) => {
    return (
        <>
            {props.isActive ? (
                <>
                    <div className={styles.overlay} onClick={props.closeFunction}></div>
                    <div className={styles.modal}>
                        <div className="modal__close">
                            <Button 
                            title="Close" 
                            type="button" 
                            btnClass="btn btn__white" 
                            handleClick={props.closeFunction}></Button>
                        </div>
                        <div className="modal__content">{props.children}</div>
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default Index;