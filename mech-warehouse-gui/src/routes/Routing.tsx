import React, { ReactNode } from 'react';
import Navbar from '../components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/authentication/Login';
import Registration from '../components/authentication/Registration';
import Home from '../components/home/Home';
import Parts from '../components/inventory/Parts';
import Tools from '../components/inventory/Tools';
import Equipment from '../components/inventory/Equipment';
import Orders from '../components/orders/Orders';
import NewOrder from '../components/orders/NewOrder';
import Raports from '../components/raports/Raports';
import Employees from '../components/user/Employees';
import Account from '../components/user/Account';

const RenderWithNavbar: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <div className="main-content">
      {children}
    </div>
  </>
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<RenderWithNavbar><Home/></RenderWithNavbar>} />
        <Route path="/parts" element={<RenderWithNavbar><Parts/></RenderWithNavbar>} />
        <Route path="/tools" element={<RenderWithNavbar><Tools/></RenderWithNavbar>} />
        <Route path="/equipment" element={<RenderWithNavbar><Equipment/></RenderWithNavbar>} />
        <Route path="/orders" element={<RenderWithNavbar><Orders/></RenderWithNavbar>} />
        <Route path="/new-order" element={<RenderWithNavbar><NewOrder/></RenderWithNavbar>} />
        <Route path="/raports" element={<RenderWithNavbar><Raports/></RenderWithNavbar>} />
        <Route path="/employees" element={<RenderWithNavbar><Employees/></RenderWithNavbar>} />
        <Route path="/account" element={<RenderWithNavbar><Account/></RenderWithNavbar>} />
      </Routes>
    </Router>
  );
}

export default Routing;