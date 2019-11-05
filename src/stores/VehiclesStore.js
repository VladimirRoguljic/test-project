import {observable, action, computed, runInAction} from "mobx";
import Vehicle from "../VehicleModel/VehicleModel";
import axios from '../axios_instance'


class VehiclesStore {

    @observable vehicles = [];

    @observable unsorted = false;

    @observable filter = "";

    @action
    async loadVehicles() {
        try {
            const response = await axios.get('vehicles.json');
            runInAction(() => {
                this.vehicles = response.data;
            });
        } catch (error) {
            runInAction(() => alert(error.message));
        }
    };

    @action
    async saveNewVehicles(data) {
        try {

            await axios.put('vehicles.json', data);
            runInAction(() => {
                this.loadVehicles()
            })
        } catch (error) {
            runInAction(() => alert(error.message));
        }
    }


    @computed get filterVehicles() {
        let matchesFilter = new RegExp(this.filter, "i");
        return this.vehicles.filter(vehicle => !this.filter || matchesFilter.test(Object.values(vehicle)))
    }

    @action addVehicle = (value) => {
        let vehicle = value.split(',');
        vehicle.name = vehicle[0];
        vehicle.model = vehicle[1];
        this.vehicles.push(new Vehicle(vehicle.name, vehicle.model));
        return this.saveNewVehicles(this.vehicles)
    };


    @action sortVehicle = () => {
        const sortedArray = this.vehicles.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.vehicles.replace(sortedArray)
    };

    @action unSortVehicle = () => {
        const sortedArray = this.vehicles.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
        this.vehicles.replace(sortedArray);
    };


    @action removeVehicle = (id) => {
        let index = this.vehicles.findIndex(k => k.id === id);
        this.vehicles.splice(index, 1)
    };

    @computed get vehicleCount() {
        return this.vehicles.length
    }

}

const store = new VehiclesStore();
export default store;