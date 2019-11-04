import {observable, action, computed} from "mobx";
import Vehicle from "../VehicleModel/VehicleModel";


class VehiclesStore {
    @observable vehicles = [
        {id: 1, name: 'Ford', model: 'Fiesta'},
        {id: 2, name: 'Audi', model: 'Q3'},
        {id: 3, name: 'BMW', model: '325'},
        {id: 4, name: 'Mercedes', model: '220D'},
        {id: 5, name: 'Seat', model: 'Ibiza'},
        {id: 6, name: 'Renault', model: 'Kadjar'},
        {id: 7, name: 'Opel', model: 'Insignia'},
    ];

    @observable filter = "";

    @computed get filterVehicles() {
        let matchesFilter = new RegExp(this.filter, "i");
        return this.vehicles.filter(vehicle => !this.filter || matchesFilter.test(Object.values(vehicle)))
    }

    @action addVehicle = (value) => {
        let vehicle = value.split(',');
        vehicle.name = vehicle[0];
        vehicle.model = vehicle[1];
        this.vehicles.push(new Vehicle(vehicle.name, vehicle.model))
    };

    @action sortVehicle = () => {
        const sortedArray = this.vehicles.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.vehicles.replace(sortedArray)
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