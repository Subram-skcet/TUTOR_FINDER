import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Modal.css'; // Import the CSS file
import { IoClose } from "react-icons/io5";


const Modal = ({ children, isopen, onClose, childrenWidth }) => {
    const childrenRef = useRef('');
    const [modelClass, setModelClass] = useState('');
    const [overlayClass, setOverlayClass] = useState('');

    const setStyles = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        if (childrenWidth + 40 >= screenWidth) {
            setOverlayClass('new-overlay-styles');

            let childHeight;
            if (childrenRef.current)
            childHeight = childrenRef.current.offsetHeight;
            
            setModelClass(childHeight+50 < screenHeight ? 'new-centered-modal-styles' : 'new-modal-styles');
        } else {
            setOverlayClass('overlay-styles');
            setModelClass('modal-styles');
        }
    };

    useEffect(() => {
        setStyles();
         // eslint-disable-next-line
    }, [isopen, children, childrenWidth]);

    useEffect(() => {
        window.addEventListener('resize', setStyles);
        return () => window.removeEventListener('resize', setStyles);
         // eslint-disable-next-line
    }, [childrenWidth]);

    if (!isopen) return null;

    const childrenWithProps = React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { onClose }) : child
    );

    return ReactDom.createPortal(
        <div className='modal-helper'>
        <div className={overlayClass} aria-modal="true" role="dialog" onClick={onClose}>
            <div className={modelClass} onClick={(e) => e.stopPropagation()}>
                <div className="close-styles" onClick={onClose}>
                     <IoClose size="1.25em"/>
                </div>
                <div ref={childrenRef}>{childrenWithProps}</div>
            </div>
        </div>
        </div>,
        document.getElementById('portal')
    );
};

export default Modal;
