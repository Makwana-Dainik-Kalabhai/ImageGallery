import React from "react";
import "./Navbar.css";

function Navbar(props) {
    return (
        <>
            <div className="top-loader" style={{ width: `${props.load}%` }}></div>
            <nav>
                <div className="header">
                    <img src="./logo.png" className="logo" alt="img not found" />
                    <hr />
                    <h2>Find the Best</h2>
                    <p>An image gallery app is a digital application designed to help users to access image collections. It offers a user-friendly interface that allows individuals to access categorized photos and pictures. You can download the pictures or images.</p>
                    <a href="#hero">Try Now</a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;