import React, {Component} from 'react';
import './App.css';
import './components/VehicleList'
import {inject, observer} from "mobx-react";

@observer
class App extends Component {

    filter(e) {
        this.props.VehiclesStore.filter = e.target.value
    }

    addVehicle(event) {
        if (event.which === 13) {
            this.props.VehiclesStore.addVehicle(event.target.value);
            event.target.value = "";
        }
    }

    removeVehicle(id) {
        this.props.VehiclesStore.removeVehicle(id)
    }

    sortVehicle() {
        this.props.VehiclesStore.sortVehicle();
        this.props.VehiclesStore.unsorted = !this.props.VehiclesStore.unsorted;
    }

    reversSort() {
        this.props.VehiclesStore.unSortVehicle();
        this.props.VehiclesStore.unsorted = !this.props.VehiclesStore.unsorted;
    }

    render() {
        const {VehiclesStore} = this.props;
        const {filter, filterVehicles} = this.props.VehiclesStore;
        const vehiclesList = filterVehicles.map(vehicle => {
            return (
                <li key={vehicle.id}>
                    <span>Vehicle : {vehicle.name}</span>
                    <span> Model: {vehicle.model}</span>
                    <button onClick={() => this.removeVehicle(vehicle.id)}>Remove vehicle</button>
                </li>
            )
        });

        return (
            <div className="App">
                <h1>Vehicles List</h1>
                <div>{filter}</div>
                <span>
                    <label>Filter vehicles: </label>
                    <input value={filter} type="text" onChange={this.filter.bind(this)}/>
                    <button   onClick={() => VehiclesStore.unsorted ?  this.reversSort() : this.sortVehicle() } style={{'marginLeft': '10px'}}>
                        {VehiclesStore.unsorted ? 'Unsorted Vehicles' : 'Sorted Vehicles'}
                    </button>

                </span>
                <h3>You have {VehiclesStore.vehicleCount} vehicles in your list!</h3>
                <ul>{vehiclesList}</ul>
                <label>Add new vehicle: </label>
                <input style={{'marginBottom': '10px'}} type="text" onKeyPress={this.addVehicle.bind(this)}/>
            </div>
        );
    }

}

export default inject("VehiclesStore")(App);

