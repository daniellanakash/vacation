import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import { VacationsPage } from './pages/vacation-page';
import { HomePage } from './pages/home-page';
import 'antd/dist/antd.css';
import { Register } from './pages/register';
import { Graph } from './pages/Graph';
import { AdminPage } from './pages/admin.page';


function App() { 
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/vacations" component={VacationsPage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/graph" component={Graph} />


    </Router>
  );
}

export default App;
