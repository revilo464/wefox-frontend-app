import React from 'react';
import { Navbar } from 'react-bootstrap';

const Nav = () => (
  <header>
    <Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand>
        <img
          alt=""
          src="https://www.wefox.de/_landingpages/wordpress/assets/logo-dark-icon.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{'  '}
        wefox Posts
      </Navbar.Brand>
    </Navbar>
  </header>
);

export default Nav;
