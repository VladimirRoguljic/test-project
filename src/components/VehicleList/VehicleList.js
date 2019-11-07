import React from 'react'
import './VehicleList.css';
import {inject} from "mobx-react";
import Spinner from '../../UI/Spinner'


const VehicleList = (props) => {
    const {filterVehicles, loading} = props.VehiclesStore;

    if(loading) {
        return (
            <Spinner />
        )
    }

    const vehiclesList = filterVehicles.map(vehicle => {
        return (
            <ul key={vehicle.id}>
                <li style={{cursor: 'pointer'}}>
                    <span>Vehicle : {vehicle.name} <p onClick={() => props.deleteVehicle(vehicle.keyFirebase)} style={{float:'right'}}>Delete</p></span>
                    <span> Model: {vehicle.model}</span>
                </li>
            </ul>
        )
    });

    return (
        <div>
            {vehiclesList}
            <div style={{marginBottom: '10px'}}>
                <button onClick={() => props.prevPage()}>Prev page</button>
                <button style={{marginLeft: '10px'}} onClick={() => props.nextPage()}>Next page</button>
            </div>
        </div>
    )
};

export default inject('VehiclesStore')(VehicleList);