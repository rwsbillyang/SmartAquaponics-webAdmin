
import './app.css'

import { Router, Route } from 'preact-router';
import { AppRoutes, routeGuard } from './AppRoute';



export const App = () => (
  <Router onChange={routeGuard}>
    {AppRoutes.map((e)=><Route {...e}/>)}
  </Router>
);
