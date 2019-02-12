import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const Contacts = ({ contacts }) => (
    <Container className="px-0">
        <Helmet title="Phone » Contacts" />
        <h2 className={classnames('ml-3', 'mb-4')}>Contacts</h2>
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
    </Container>
);

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
