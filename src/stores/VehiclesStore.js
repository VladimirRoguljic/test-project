import {observable, action, computed, runInAction} from "mobx";
import Vehicle from "../VehicleModel/VehicleModel";
import axios from '../axios_instance'
import wrapper from '../wrapper'

class VehiclesStore {

    @observable vehicles = [];

    @observable unsorted = false;

    @observable filter = "";

    @observable loading = false;


    @action
    async loadVehicles() {
        this.loading = true;
        const {error, data} = await wrapper(axios.get('vehicles.json?orderBy="id"&limitToFirst=5'));
        if (data) {
            const fetchVehicles = [];
            this.paginate(data, fetchVehicles)
        } else alert(error.message);
    }


    @action
    async saveNewVehicles(data) {
        this.loading = true;
        const {error} = await wrapper(axios.post('vehicles.json', data));
        if (!error) {
            runInAction(() => {
                this.loadVehicles();
                this.loading = false;
            });

        } else alert(error.message);
    }


    @computed get filterVehicles() {
        let matchesFilter = new RegExp(this.filter, "i");
        return this.vehicles.filter(vehicle => !this.filter || matchesFilter.test(Object.values(vehicle)))
    }

    @action addVehicle = (value) => {
        let vehicle = value.split(',');
        vehicle.name = vehicle[0];
        vehicle.model = vehicle[1];
        let objectToSend = {...new Vehicle(vehicle.name, vehicle.model)};
        return this.saveNewVehicles(objectToSend)
    };


    @action sortVehicle = () => {
        const sortedArray = this.vehicles.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.vehicles.replace(sortedArray)
    };

    @action unSortVehicle = () => {
        const sortedArray = this.vehicles.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
        this.vehicles.replace(sortedArray);
    };

    @action
    async nextPage() {
        let lastElementInArray = this.vehicles.pop();
        let trackId = lastElementInArray.id;
        const {data, error} = await wrapper(axios.get(`vehicles.json?orderBy="id"&limitToFirst=5&startAt=${trackId}`));
        if (data) {
            const fetchVehicles = [];
            this.paginate(data, fetchVehicles);
        } else alert(error.message)
    };

    paginate = (data, fetchVehicles) => {
        const response = data;
        for (let key in response.data) {
            fetchVehicles.push({
                ...response.data[key]
            })
        }
        runInAction(() => {
            this.vehicles = fetchVehicles;
            this.loading = false
        });
    };


    @action
    async prevPage() {
        let elementInArray = this.vehicles.shift();
        const trackId = elementInArray.id;
        const {error, data} = await wrapper(axios.get(`vehicles.json?orderBy="id"&limitToLast=5&endAt=${trackId}`));
        if (data) {
            const fetchVehicles = [];
            this.paginate(data, fetchVehicles)
        } else alert(error.message)
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