import React from 'react'

const PopUpFields = (props) => {
  return (
    <div>
        <img src={props.img}></img>
        <p>{props.fieldname}:{props.fieldvalue}</p>
    </div>
  )
}

export default PopUpFields