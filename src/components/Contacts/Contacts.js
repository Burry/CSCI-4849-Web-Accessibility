import React, { useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTable,
    faQuestionCircle,
    faPhone,
    faEnvelope
} from '@fortawesome/pro-solid-svg-icons';

const Contacts = ({ contacts }) => {
    const [isTableVisible, toggleTable] = useState(true);
    return (
        <Container className="px-0">
            <Helmet title="Phone » Contacts" />
            <div
                className={classNames(
                    'd-flex',
                    'align-items-center',
                    'justify-content-between',
                    'mx-3',
                    'mb-4'
                )}
            >
                <h2 className="mb-0">Contacts</h2>
                <Button
                    variant="outline-dark"
                    onClick={() => toggleTable(!isTableVisible)}
                    aria-label={isTableVisible ? 'Show list' : 'Show table'}
                >
                    <FontAwesomeIcon
                        icon={isTableVisible ? faBars : faTable}
                        fixedWidth
                    />
                </Button>
            </div>
            {isTableVisible ? (
                <Table bordered={!isMobile} className={!isMobile && 'mx-3'}>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(({ name, phone, email, photo }) => (
                            <tr key={name}>
                                <td>
                                    {photo ? (
                                        <img
                                            src={photo}
                                            alt={name}
                                            height="24px"
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                            fixedWidth
                                        />
                                    )}
                                </td>
                                <td>{name}</td>
                                <td>
                                    <Link
                                        to={`/keypad/${phone}`}
                                        className="text-success"
                                        aria-label={`Call ${name}`}
                                    >
                                        <FontAwesomeIcon icon={faPhone} />
                                    </Link>
                                </td>
                                <td>
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-primary"
                                        aria-label={`Email ${name}`}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <ListGroup
                    variant={isMobile && 'flush'}
                    className={!isMobile && 'px-3'}
                >
                    {contacts.map(({ name, phone, email }, idx) => (
                        <ListGroup.Item
                            key={`${name}-${idx}`}
                            action
                            as={Link}
                            to={`/contacts/${encodeURI(name)}`}
                            aria-label={`${name}'s Contact`}
                        >
                            {name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

Contacts.propTypes = {
    contacts: arrayOf(
        shape({
            name: string,
            email: string,
            phone: string
        })
    ).isRequired
};

const mapStateToProps = ({ contacts: { list: contacts } }) => ({
    contacts
});

export default connect(mapStateToProps)(Contacts);
