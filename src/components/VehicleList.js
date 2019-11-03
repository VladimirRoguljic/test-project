import React from 'react'
import './VehicleList.css'

const VehicleList = (props) => {
    return (
        <li key={props.id}>{props.name}</li>
    )
};

export default VehicleList