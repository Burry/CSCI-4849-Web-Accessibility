import React from 'react';
import { string, oneOfType, object, array } from 'prop-types';
import classNames from 'classnames';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NavLink.module.scss';

const NavLink = ({ to, label, icon }) => (
    <RouterNavLink
        to={to}
        className={classNames(styles.root, 'px-4', 'py-2')}
        activeClassName={styles.active}
        aria-label={`To ${label}`}
    >
        <FontAwesomeIcon
            icon={icon}
            size="lg"
            fixedWidth
            className={classNames('d-block', 'm-auto')}
        />
        <small>{label}</small>
    </RouterNavLink>
);

NavLink.propTypes = {
    to: string.isRequired,
    label: string.isRequired,
    icon: oneOfType([object, array, string]).isRequired
};

export default NavLink;
