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
                        <div className={styles.modal__header}>
                            <div className="modal__close">
                                <Button 
                                title="x" 
                                type="button" 
                                btnClass="btn__pink" 
                                handleClick={props.closeFunction}></Button>
                            </div>
                            <h2>{props.title}</h2>
                        </div>
                        <hr />
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