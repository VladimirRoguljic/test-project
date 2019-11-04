import React from 'react';
import './AddNewVehicle.css'
import {inject} from "mobx-react";

const AddNewVehicle = (props) => {
    return (
       <div className="AddNewVehicle">
           <label>Add new vehicle: </label>
           <input type="text" onKeyPress={props.addVehicle}/>
       </div>
    )
};

export default inject("VehiclesStore")(AddNewVehicle);