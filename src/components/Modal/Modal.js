import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#fff',
    padding:'20px',
    zIndex:1000
}

const OVERLAY_STYLES = {
    position:'fixed',
    top:0,
    left:0,
    bottom:0,
    right:0,
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:1000
}

const CLOSE_STYLES = {
    position: 'absolute',
    right: '10px', // Closer to the edge
    top: '10px',
    cursor: 'pointer',
    color: '#333', // Darker color for better visibility
    fontSize: '24px', // Increase icon size
}

const Modal = ({ children, isopen, onClose }) => {
    if (!isopen)
        return null;
    return ReactDom.createPortal(
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <div style={CLOSE_STYLES} onClick={onClose}>
                    <CloseIcon />
                </div>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default Modal;
