import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import VehiclesStore from "./stores/VehiclesStore";
import {Provider} from "mobx-react";


const Root = (
    <Provider VehiclesStore={VehiclesStore}>
        <App />
    </Provider>
);


ReactDOM.render(Root, document.getElementById('root'));
serviceWorker.unregister();
