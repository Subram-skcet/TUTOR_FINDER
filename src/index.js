import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { DataLayer } from './StateProviders/StateProvider';
import reducer,{initialState} from './StateProviders/reducer';
import { BrowserRouter } from 'react-router-dom';
import Route from './Routes/Route'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <BrowserRouter>
      <Route/>
    </BrowserRouter>
    </DataLayer>
  </React.StrictMode>
  </>
);

