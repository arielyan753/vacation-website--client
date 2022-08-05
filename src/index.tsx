import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';
import interceptorsService from './Services/InterceptorsService';
import { BrowserRouter } from 'react-router-dom';


interceptorsService.createInterceptors()

ReactDOM.render(
    <React.StrictMode>
            <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
