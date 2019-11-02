import {observable, action} from "mobx";

class VehiclesStore {
   @observable vehicles = [];

   @action addVehicle = (vehicle) => {
       this.vehicles.push(vehicle)
   };

}

const store = new VehiclesStore();
export default store;