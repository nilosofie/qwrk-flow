import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { UsersProvider } from './context/users.context';
import { OrgProvider } from './context/org.context';
import { OrgTreeProvider } from './context/org-tree.context';
import { WizStepCountProvider } from './context/wiz-step-count.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <OrgProvider>
          <WizStepCountProvider>
            <OrgTreeProvider>
              <App />
            </OrgTreeProvider>
          </WizStepCountProvider>
        </OrgProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
