import React, { useState } from 'react';
import { func } from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PhoneNumber from 'awesome-phonenumber';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import Input from './Input';
import schema from './schema';
import { addContact as _addContact } from '../../state/modules/contacts';

const phoneNumber = value =>
    new PhoneNumber(value, 'US').getNumber('national') || value;

const NewContact = ({ addContact, pushRoute }) => {
    const emptyContact = {
        givenName: '',
        familyName: '',
        phone: '',
        email: ''
    };
    const invalidFields = {
        givenName: false,
        familyName: false,
        phone: false,
        email: false
    };
    const [contact, setContact] = useState(emptyContact);
    const [dirty, setDirty] = useState(false);
    const [errors, setErrors] = useState([]);
    const [invalid, setInvalid] = useState(invalidFields);
    const { givenName, familyName, phone, email } = contact;

    const handleChange = ({ target: { id, value } }) => {
        setContact({
            ...contact,
            ...(id === 'phone'
                ? {
                      phone: phoneNumber(value)
                  }
                : { [id]: value })
        });
        setDirty(true);
        setInvalid({
            ...invalid,
            ...(id === 'givenName' || id === 'familyName'
                ? { givenName: false, familyName: false }
                : { [id]: false })
        });
    };

    const handleSubmit = async event => {
        if (event) event.preventDefault();
        const newContact = {
            name:
                givenName && familyName
                    ? `${givenName} ${familyName}`
                    : givenName || familyName,
            phone,
            email
        };
        try {
            await schema.validate(newContact);
            addContact(newContact);
            pushRoute(`/contacts/${encodeURI(newContact.name)}`);
        } catch ({ errors }) {
            errors.forEach(function(error) {
                if (error.includes('name'))
                    setInvalid({
                        ...invalid,
                        givenName: true,
                        familyName: true
                    });
                else if (error.includes('Phone'))
                    setInvalid({ ...invalid, phone: true });
                else if (error.includes('Email'))
                    setInvalid({ ...invalid, email: true });
            });
            setErrors(errors);
        }
    };

    const handleClearButton = () => {
        setContact(emptyContact);
        setDirty(false);
        setErrors([]);
        setInvalid(invalidFields);
    };

    return (
        <Container>
            <Helmet title="Phone » New Contact" />
            <h2>New Contact</h2>
            <Form onSubmit={handleSubmit}>
                {errors.length !== 0 && (
                    <Alert variant="danger">
                        {errors.map(error => (
                            <div key={error}>{error}</div>
                        ))}
                    </Alert>
                )}
                <Form.Row>
                    <Form.Group className="col-6">
                        <Form.Label htmlFor="givenName">
                            <FontAwesomeIcon
                                icon={faUser}
                                fixedWidth
                                className="mr-1"
                            />
                            Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="givenName"
                            value={givenName}
                            placeholder="First"
                            onChange={handleChange}
                            isInvalid={invalid.givenName}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="col-6 mt-auto">
                        <Form.Control
                            type="text"
                            id="familyName"
                            value={familyName}
                            placeholder="Last"
                            onChange={handleChange}
                            isInvalid={invalid.familyName}
                        />
                    </Form.Group>
                </Form.Row>
                <Input
                    name="phone"
                    type="tel"
                    icon={faPhone}
                    value={phone}
                    placeholder="(555) 555-5555"
                    onChange={handleChange}
                    isInvalid={invalid.phone}
                />
                <Input
                    name="email"
                    type="email"
                    icon={faEnvelope}
                    value={email}
                    placeholder="jon.doe@protonmail.com"
                    onChange={handleChange}
                    isInvalid={invalid.email}
                />
                <Form.Row
                    className={classNames(
                        'pt-3',
                        'text-center',
                        'align-items-center'
                    )}
                >
                    {/* Padding */}
                    {dirty && <Col />}
                    <Col>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            aria-label="Save Contact"
                        >
                            Save
                        </Button>
                    </Col>
                    {dirty && (
                        <Col>
                            <Button
                                variant="outline-danger"
                                aria-label="Clear Contact"
                                onClick={handleClearButton}
                            >
                                Clear
                            </Button>
                        </Col>
                    )}
                </Form.Row>
            </Form>
        </Container>
    );
};

NewContact.propTypes = {
    addContact: func.isRequired,
    pushRoute: func.isRequired
};

const mapDispatchToProps = {
    addContact: _addContact
};

export default connect(
    null,
    mapDispatchToProps
)(NewContact);
