import React from 'react';
import { string, oneOfType, object, array } from 'prop-types';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = ({ name, icon, className, ...props }) => (
    <FormGroup>
        <FormLabel htmlFor={name}>
            <FontAwesomeIcon icon={icon} fixedWidth className="mr-1" />
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </FormLabel>
        <FormControl className={className} id={name} {...props} />
    </FormGroup>
);

Input.propTypes = {
    name: string.isRequired,
    icon: oneOfType([object, array, string]).isRequired,
    className: string
};

Input.defaultProps = {
    className: ''
};

export default Input;
