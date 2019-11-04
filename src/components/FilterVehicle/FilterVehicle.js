import React from 'react';
import './FilterVehicle.css'
import {inject} from "mobx-react";

const FilterVehicle = (props) => {
    const {filter, vehicleCount, unsorted} = props.VehiclesStore;
    return (
        <div className="FilterVehicle">
            <h1>Vehicles List</h1>
            <div>{filter}</div>
            <span>
                    <label>Filter vehicles: </label>
                    <input value={filter} type="text" onChange={props.filter}/>
                    <button onClick={() => unsorted ? props.reversArr() : props.sortArr()}
                            style={{'marginLeft': '10px'}}>
                        {unsorted ? 'Descending Vehicles' : 'Ascending Vehicles'}
                    </button>

                </span>
            <h3>You have {vehicleCount} vehicles in your list!</h3>
        </div>
    )
};

export default inject("VehiclesStore")(FilterVehicle);