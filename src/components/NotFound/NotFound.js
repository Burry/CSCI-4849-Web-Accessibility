import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerQuestion } from '@fortawesome/pro-solid-svg-icons';

const NotFound = () => (
    <Container className="text-center">
        <h1>Oops!</h1>
        <p>Looks like this page doesn&apos;t exist.</p>
        <FontAwesomeIcon
            icon={faMapMarkerQuestion}
            size="5x"
            className="d-block mx-auto my-5"
        />
        <Button variant="primary" as={Link} to="/keypad" type={null}>
            Go Home
        </Button>
    </Container>
);

export default NotFound;
