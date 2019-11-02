import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "mobx-react";
import VehicleStore from './stores/VehiclesStore';

const Root = (
    <Provider VehicleStore={VehicleStore}>
        <App/>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
serviceWorker.unregister();
