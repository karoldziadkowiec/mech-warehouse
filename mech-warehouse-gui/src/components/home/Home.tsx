import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { Button } from 'react-bootstrap';
import '../../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLinkClick = (id: string) => {
        scroller.scrollTo(id, {
            smooth: true,
            duration: 100
        });
    };

    const moveToPartsPage = () => {
        navigate('/parts');
    };

    const moveToToolsPage = () => {
        navigate('/tools');
    };

    const moveToEquipmentPage = () => {
        navigate('/equipment');
    };

    const moveToOrdersPage = () => {
        navigate('/orders');
    };

    const moveToNewOrderPage = () => {
        navigate('/new-order');
    };

    const moveToRaportsPage = () => {
        navigate('/raports');
    };

    const moveToEmployeesPage = () => {
        navigate('/employees');
    };

    const moveToAccountPage = () => {
        navigate('/account');
    };

    return (
        <div className="Home">
            <div className="links">
                <RouterLink onClick={() => handleLinkClick("inventory")} to="#" className="link" style={{ cursor: "pointer" }}>Inventory</RouterLink>
                <div className="sign"> | </div>
                <RouterLink onClick={() => handleLinkClick("orders")} to="#" className="link" style={{ cursor: "pointer" }}>Orders</RouterLink>
                <div className="sign"> | </div>
                <RouterLink onClick={() => handleLinkClick("raports")} to="#" className="link" style={{ cursor: "pointer" }}>Raports</RouterLink>
            </div>
            <div className="links">
                <RouterLink onClick={() => handleLinkClick("employees")} to="#" className="link" style={{ cursor: "pointer" }}>Employees</RouterLink>
                <div className="sign"> | </div>
                <RouterLink onClick={() => handleLinkClick("account")} to="#" className="link" style={{ cursor: "pointer" }}>Account</RouterLink>
            </div>
            <Element name="home" className="startSection">
                <h1><span className="mech-warehouse">mech-warehouse</span></h1>
                <img src={require('../../img/logo.png')} alt="homeLogo" className="homeLogo" />
                <h2>MECH-WAREHOUSE - WHERE PRECISION MEETS EFFICIENCY</h2>
                <h4>Explore our comprehensive inventory of parts and equipment to streamline your operations and keep your business running smoothly.</h4>
            </Element>
            <Element name="inventory" className="blackSection">
                <h1>Inventory</h1>
                <h5>Manage your warehouse stock with our intuitive tools – easily add, remove, and edit items to ensure your inventory is always up to date.</h5>
                <h5>From essential components to specialized tools, find everything you need.</h5>
                <p></p>
                <div className="links">
                    <Button variant="warning" onClick={moveToPartsPage}>Parts</Button>
                    <div className="sign"> | </div>
                    <Button variant="warning" onClick={moveToToolsPage}>Tools</Button>
                    <div className="sign"> | </div>
                    <Button variant="warning" onClick={moveToEquipmentPage}>Equipment</Button>
                </div>
            </Element>
            <Element name="orders" className="whiteSection">
                <h1>Orders</h1>
                <h5>Efficiently track orders for your warehouse, ensuring prompt fulfillment to maintain project schedules without delay.</h5>
                <h5>Our streamlined system guarantees timely delivery, keeping your operations running smoothly.</h5>
                <p></p>
                <div className="links">
                    <Button variant="warning" onClick={moveToOrdersPage}>Orders</Button>
                    <div className="sign"> | </div>
                    <Button variant="warning" onClick={moveToNewOrderPage}>New Order</Button>
                </div>
            </Element>
            <Element name="raports" className="blackSection">
                <h1>Raports</h1>
                <h5>Access comprehensive reports detailing key metrics and performance indicators for your mechanical warehouse.</h5>
                <h5>Gain valuable insights to optimize operations and drive informed decision-making for enhanced productivity and efficiency.</h5>
                <p></p>
                <Button variant="warning" onClick={moveToRaportsPage}>Raports</Button>
            </Element>
            <Element name="employees" className="whiteSection">
                <h1>Employees</h1>
                <h5>Meet dedicated team of skilled professionals committed to delivering exceptional service to your warehouse.</h5>
                <h5>Look at the data of your colleagues and manage with them carefully.</h5>
                <p></p>
                <Button variant="warning" onClick={moveToEmployeesPage}>Employees</Button>
            </Element>
            <Element name="account" className="blackSection">
                <h1>Account</h1>
                <h5>Easily manage your account details and preferences with our intuitive platform tailored for your convenience.</h5>
                <h5>Navigate effortlessly through your account settings, meticulously designed to ensure utmost user-friendliness and convenience.</h5>
                <p></p>
                <Button variant="warning" onClick={moveToAccountPage}>Account</Button>
            </Element>
        </div>
    );
}

export default Home;