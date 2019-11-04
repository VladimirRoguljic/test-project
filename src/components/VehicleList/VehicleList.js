import React from 'react'
import './VehicleList.css';
import {inject} from "mobx-react";


const VehicleList = (props) => {
    const {filterVehicles} = props.VehiclesStore;
    const vehiclesList = filterVehicles.map(vehicle => {
        return (
            <ul key={vehicle.id}>
                <li>
                    <span>Vehicle : {vehicle.name}</span>
                    <span> Model: {vehicle.model}</span>
                </li>
            </ul>
        )
    });

    return (
        <div>
            {vehiclesList}
        </div>
    )
};

export default inject('VehiclesStore')(VehicleList);