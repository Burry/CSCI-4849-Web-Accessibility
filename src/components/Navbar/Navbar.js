import React from 'react';
import classNames from 'classnames';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
    faTh,
    faBookUser,
    faUserPlus,
    faQuestionCircle
} from '@fortawesome/pro-solid-svg-icons';
import NavLink from './NavLink';
import styles from './Navbar.module.scss';

const Navbar = () => (
    <BootstrapNavbar
        variant="light"
        bg="light"
        fixed="bottom"
        className={classNames(styles.root, 'p-0', 'bg-light')}
    >
        <Nav className="mx-auto" role="navigation">
            <NavLink to="/keypad" label="Keypad" icon={faTh} />
            <NavLink to="/contacts" label="Contacts" icon={faBookUser} />
            <NavLink to="/new-contact" label="New Contact" icon={faUserPlus} />
            <NavLink to="/about" label="About" icon={faQuestionCircle} />
        </Nav>
    </BootstrapNavbar>
);

export default Navbar;
