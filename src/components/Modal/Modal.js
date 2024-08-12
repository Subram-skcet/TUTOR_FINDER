import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const MODAL_STYLES = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#fff',
    padding:'50px',
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
    position:'absolute',
    right:'5%',
    top:'7%'
}



const Modal = ({children,isopen,onClose}) => {
    if(!isopen)
        return
  return (
    <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
            <div style={CLOSE_STYLES} onClick={onClose} >
                <CloseIcon/>
            </div>
        {children}
        </div>
    </div>
  )
}

export default Modal
