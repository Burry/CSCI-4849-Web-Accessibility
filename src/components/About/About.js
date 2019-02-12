import React from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import PhoneIcon from '../PhoneIcon';
import styles from './About.module.scss';

const About = () => (
    <Container>
        <Helmet title="Phone » About" />
        <h2>About</h2>
        <div
            className={
                classNames(
                    styles.icon,
                    'mx-auto',
                    'my-5',
                    'bg-success',
                    'd-flex',
                    'align-items-center',
                    'justify-content-center'
                )
            }
            aria-label="Phone Icon"
        >
            <PhoneIcon height="162px" />
        </div>
        <p className={classNames('text-center', 'text-muted')}>
            &copy; Grant Burry {new Date().getFullYear()}
        </p>
    </Container>
);

export default About;
