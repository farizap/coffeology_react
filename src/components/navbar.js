import React from "react";
import navbarProfile from "../assets/images/navbarProfile.png";
import navbarSearch from "../assets/images/navbarSearch.png";
import navbarBeans from "../assets/images/navbarBeans.png";
import navbarBrew from "../assets/images/navbarBrew.png";
import navbarActivity from "../assets/images/navbarActivity.png";
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <div className="navbar">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-2">
                        <Link to={"/"}>
                            <img src={navbarBrew} className="navbarLogo" />
                            <br />
                            Seduh
                        </Link>
                    </div>
                    <div className="col-2">
                        <img src={navbarBeans} className="navbarLogo" />
                        <br />
                        Biji
                    </div>
                    <div className="col-2">
                        <img src={navbarSearch} className="navbarLogo" />
                        <br />
                        Cari
                    </div>
                    <div className="col-2">
                        <img src={navbarActivity} className="navbarLogo" />
                        <br />
                        Aktivitas
                    </div>
                    <div className="col-2">
                        <img src={navbarProfile} className="navbarLogo" />
                        <br />
                        Profile
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
