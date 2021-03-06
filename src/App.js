import React, {Component} from 'react';
import './App.css';
import './components/VehicleList/VehicleList'
import {inject, observer} from "mobx-react";
import VehicleList from "./components/VehicleList/VehicleList";
import FilterVehicle from "./components/FilterVehicle/FilterVehicle";
import AddNewVehicle from "./components/AddNewVehicle/AddNewVehicle";


@observer
class App extends Component {

    componentDidMount() {
         return this.props.VehiclesStore.loadVehicles()
    }

    filterVehicle = (e) => {
        this.props.VehiclesStore.filter = e.target.value;
        this.setState({
            ...this.props.VehiclesStore.filter
        })
    };

    addVehicle = (e) => {
        if (e.which === 13) {
            this.props.VehiclesStore.addVehicle(e.target.value);
            e.target.value = "";
            this.setState({
                ...this.props.VehiclesStore.addVehicle
            })
        }
    };

    // removeVehicle(id) {
    //     this.props.VehiclesStore.removeVehicle(id)
    // }

    sortVehicle = () => {
        this.props.VehiclesStore.sortVehicle();
        this.props.VehiclesStore.unsorted = !this.props.VehiclesStore.unsorted;
        this.setState({
            ...this.props.VehiclesStore.sortVehicle,
        });
    };

    reversSort = () => {
        this.props.VehiclesStore.unSortVehicle();
        this.props.VehiclesStore.unsorted = !this.props.VehiclesStore.unsorted;
        this.setState({
            ...this.props.VehiclesStore.reversSort
        });
    };

    nextPage  = () => {
        this.props.VehiclesStore.nextPage();
    };

    prevPage = ()  => {
        this.props.VehiclesStore.prevPage()
    };

    deleteRecord = (key) => {
        this.props.VehiclesStore.deleteRecord(key)
    };

    render() {
        const {VehiclesStore} = this.props;
        const {vehicles, vehicleCount} = this.props.VehiclesStore;

        return (
            <div className="App">
                <FilterVehicle
                    store={VehiclesStore}
                    filter={this.filterVehicle}
                    sortArr={this.sortVehicle}
                    reversArr={this.reversSort}
                    key={vehicles.id} />

                <VehicleList
                    store={VehiclesStore}
                    key={vehicles.id}
                    nextPage={this.nextPage}
                    prevPage={this.prevPage}
                    vehicleCount={vehicleCount}
                    deleteVehicle={this.deleteRecord}
                />

                <AddNewVehicle
                    addVehicle={this.addVehicle} />
            </div>
        );
    }

}

export default inject("VehiclesStore")(App);

