import React, {Component} from 'react';
import './App.css';
import './components/VehicleList'
import {inject, observer} from "mobx-react";

@observer
class App extends Component {

    filter(e) {
        this.props.VehiclesStore.filter = e.target.value
    }

    render() {
        const {VehiclesStore} = this.props;
        const {filter, filterVehicles} = this.props.VehiclesStore;
        const vehiclesList = filterVehicles.map(vehicle => {
            return (
                <li key={vehicle.id}>
                    Vehicle : {vehicle.name} Model: {vehicle.model}
                </li>
            )
        });

        return (
            <div className="App">
                <h1>Vehicles List</h1>
                <div>{filter}</div>
                <span><input value={filter} type="text" onChange={this.filter.bind(this)}/></span>
                <h3>You have {VehiclesStore.vehicleCount} vehicles in your list!</h3>
                <ul>{vehiclesList}</ul>
            </div>
        );
    }

}

export default inject("VehiclesStore")(App);

