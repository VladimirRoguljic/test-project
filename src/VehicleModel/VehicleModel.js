import {observable} from "mobx";

class Vehicle {
    @observable name;
    @observable model;
    @observable id;

    constructor(name, model) {
        this.name = name;
        this.model = model;
        this.id = Date.now();
    }
}

export default Vehicle