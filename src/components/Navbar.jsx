import React from 'react';
import './Navbar.css'; // Certifique-se de importar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">
          <img src="/img/logo-light.png" alt="Logo" />
        </a>
      </div>
      <div className="navbar-collapse">
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/gallery.html">GALLERY</a></li>
          <li><a href="/contact.html">CONTACT</a></li>
          <li><a href="http://18.116.12.206:3000">MONTE SUA TRIP</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
