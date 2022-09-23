import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/bricksrepo_logo.png';
import Auth from '../utils/auth';
function Header() {
    return (
        <>
            <header className="navbar navbar-expand-md navbar-dark bd-navbar sticky-top">
                <nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap" aria-label="Main navigation">
                    <div className="d-lg-none"></div>
                    <Link to="/" className="navbar-brand p-0 me-0 me-lg-2" aria-label="">
                        <img className="logo" src={logo} alt="BricksRepo logo" />
                    </Link>
                    <button className="navbar-toggler d-flex d-lg-none order-3 p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-label="Toggle navigation">
                        <i className="bi bi-three-dots"></i>
                    </button>
                    <div className="offcanvas-lg offcanvas-end flex-grow-1" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel" data-bs-scroll="true">
                        <div className="offcanvas-header px-4 pb-0">
                            <h5 className="offcanvas-title" id="bdNavbarOffcanvasLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"></button>
                        </div>
                        <div className="offcanvas-body p-4 pt-0 p-lg-0">
                            <ul className="navbar-nav flex ms-md-auto">
                                <li className="sidebar-brand"></li>
                                <li className="nav-item py-2 px-3">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                {
                                    Auth.loggedIn() === false ?
                                        <>
                                            <li className="nav-item py-2 px-3">
                                                <Link to="/LoginForm" className="nav-link">Login</Link>
                                            </li>
                                            <li className="nav-item py-2 px-3">
                                                <Link to="/SignupForm" className="nav-link">Signup</Link>
                                            </li></>
                                        :
                                        <li className="nav-item py-2 px-3">
                                            <a onClick={Auth.logout} className="nav-link">Logout</a>
                                        </li>
                                }
                                <hr>
                                </hr>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
export default Header;