import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createMatchSelector } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faPhone,
    faEnvelope
} from '@fortawesome/pro-solid-svg-icons';
import NotFound from '../NotFound';

const Contact = ({ router, contacts }) => {
    const matchSelector = createMatchSelector('/contacts/:contactURI?');
    const { params: { contactURI = '' } = {} } = matchSelector({ router });
    const contact = contacts.find(({ name }) => name === decodeURI(contactURI));

    if (!contact) return <NotFound />;

    const { name, phone, email, photo } = contact;
    const Icon = ({ icon, variant }) => (
        <FontAwesomeIcon
            icon={icon}
            fixedWidth
            className={classNames('mr-3', `text-${variant}`)}
        />
    );

    return (
        <Container className="px-0">
            <Helmet title={`Phone » Contacts » ${name}`} />
            <h4 className="d-inline-block">
                <Link
                    to="/contacts"
                    className={classNames('ml-3', 'text-dark')}
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        fixedWidth
                        size="sm"
                    />
                </Link>
            </h4>
            <Media
                className={classNames(
                    'align-items-center',
                    !photo && 'd-inline-block'
                )}
            >
                {photo && (
                    <img
                        src={photo}
                        alt={name}
                        height="60px"
                        className="ml-3 mb-3"
                    />
                )}
                <Media.Body>
                    <h4 className="ml-3">{name}</h4>
                </Media.Body>
            </Media>
            {phone || email ? (
                <ListGroup
                    variant={isMobile && 'flush'}
                    className={!isMobile && 'px-3'}
                >
                    {phone && (
                        <ListGroup.Item
                            action
                            as={Link}
                            to={`/keypad/${phone}`}
                            className={!email && 'border-bottom'}
                            aria-label={`Call ${name}`}
                        >
                            <Icon icon={faPhone} variant="success" />
                            {phone}
                        </ListGroup.Item>
                    )}
                    {email && (
                        <ListGroup.Item
                            action
                            href={`mailto:${email}`}
                            className="border-bottom"
                            aria-label={`Email ${name}`}
                        >
                            <Icon icon={faEnvelope} variant="primary" />
                            {email}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            ) : (
                <div className="text-center text-muted py-3">No Data</div>
            )}
        </Container>
    );
};

Contact.propTypes = {
    router: shape({}).isRequired,
    contacts: arrayOf(
        shape({
            name: string,
            email: string,
            phone: string
        })
    ).isRequired
};

const mapStateToProps = ({ router, contacts: { list: contacts } }) => ({
    router,
    contacts
});

export default connect(mapStateToProps)(Contact);
