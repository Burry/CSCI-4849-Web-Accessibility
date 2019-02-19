import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import PhoneIcon from '../PhoneIcon';
import styles from './About.module.scss';

const Shortcut = ({ shortcut, action }) => (
    <ListGroup.Item className="d-flex align-items-center justify-content-between">
        <code>{shortcut}</code>
        <span>{action}</span>
    </ListGroup.Item>
);

Shortcut.propTypes = {
    shortcut: string.isRequired,
    action: string.isRequired
};

const About = () => (
    <Container>
        <Helmet title="Phone » About" />
        <h2>About</h2>
        <div
            className={classNames(
                styles.icon,
                'mx-auto',
                'my-5',
                'bg-success',
                'd-flex',
                'align-items-center',
                'justify-content-center'
            )}
            aria-label="Phone Icon"
        >
            <PhoneIcon height="96px" />
        </div>
        <h5>Keyboard Shortcuts</h5>
        <ListGroup>
            <Shortcut shortcut="CTRL + K" action="Keypad" />
            <Shortcut shortcut="CTRL + C" action="Contacts" />
            <Shortcut shortcut="CTRL + N" action="New Contact" />
            <Shortcut shortcut="CTRL + A" action="About" />
        </ListGroup>
        <br />
        <h5>Accessibility Features</h5>
        <ul>
            <li>Tab control</li>
            <li>Keyboard shortcuts</li>
            <li>Accessible tables and lists</li>
            <li>Image captions</li>
            <li>ARIA landmark roles</li>
            <li>ARIA live regions</li>
            <li>ARIA labels</li>
        </ul>
        <p className={classNames('text-center', 'text-muted', 'mt-4')}>
            Contact photos &copy;&nbsp;
            <a
                href="http://www.allxmen.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Scott Modrzynski
            </a>
        </p>
        <p className={classNames('text-center', 'text-muted')}>
            &copy; Grant Burry {new Date().getFullYear()}
        </p>
    </Container>
);

export default About;
