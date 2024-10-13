import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ReactDom from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
    cursor:'pointer'
};

const CLOSE_STYLES = {
    position: 'absolute',
    right: '10px',
    top: '10px',
    cursor: 'pointer',
    color: '#333',
    fontSize: '24px',
};

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: 'yellow',
    padding: '20px',
    zIndex: 1000,
};

const newModalStyles = {
    width: '100vw',
    minHeight: '100vh',
    maxHeight:'auto',
    padding: '20px',
    backgroundColor: 'green',
    zIndex: 1001,
    position: 'absolute',
    top: '0',
    left: '0',
};

const newOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
    height: '100vh',
    overflowY: 'auto',
}
const Modal = ({ children, isopen, onClose,childrenWidth}) => {
    const childrenRef = useRef(null);
    const [modelStyles, setModelStyles] = useState(null);
    const [overlayStyles, setOverlayStyles] = useState(null);

    const setStyles = () => {
        const screenWidth = window.innerWidth;

        console.log(childrenWidth);
        console.log(screenWidth);
        
        if (childrenWidth + 40 >= screenWidth) {
            setOverlayStyles(newOverlayStyles);
            setModelStyles(newModalStyles);
        } else {
            setOverlayStyles(OVERLAY_STYLES);
            setModelStyles(MODAL_STYLES);
        }
    };

    useEffect(()=>{
        setStyles()
        console.log(`Component ${isopen}`);
    },[isopen])


    useEffect(() => {
        window.addEventListener('resize', setStyles);
    }, []);

    if (!isopen){
        return null;
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        return React.isValidElement(child)
            ? React.cloneElement(child, { onClose })
            : child;
    });

    return ReactDom.createPortal(
            <div style={overlayStyles} aria-modal="true" onClick={onClose}>
                <div style={modelStyles} onClick={(e) => e.stopPropagation()}>
                    <div style={CLOSE_STYLES} onClick={onClose}>
                        <CloseIcon />
                    </div>
                    <div ref={childrenRef}>
                        {childrenWithProps}
                    </div>
                </div>
            </div>,
        document.getElementById('portal')
    );
};

export default Modal;
