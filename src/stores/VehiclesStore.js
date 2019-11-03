import {observable, action, computed} from "mobx";

class VehiclesStore {
   @observable vehicles = [
       {id: 1, name: 'Ford', model: 'Fiesta' },
       {id: 2, name: 'Audi', model: 'Q3' },
       {id: 3, name: 'BMW', model: '325' },
       {id: 4, name: 'Mercedes', model: '220D' },
       {id: 5, name: 'Seat', model: 'Ibiza' },
       {id: 6, name: 'Renault', model: 'Kadjar' },
       {id: 7, name: 'Opel', model: 'Insignia' },
   ];

   @observable filter = "";

   @computed get filterVehicles() {
       let matchesFilter = new RegExp(this.filter, "i");
       return this.vehicles.filter(vehicle => !this.filter || matchesFilter.test(Object.values(vehicle)) )
   }

   @action addVehicle = (vehicle) => {
       this.vehicles.push(vehicle)
   };

   @action removeVehicle = (id) => {
       this.vehicles.slice(id)
   };

   @computed get vehicleCount() {
       return this.vehicles.length
   }

}

const store = new VehiclesStore();
export default store;