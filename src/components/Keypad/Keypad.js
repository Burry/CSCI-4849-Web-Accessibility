import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createMatchSelector, push } from 'connected-react-router';
import { isMobile } from 'react-device-detect';
import PhoneNumber from 'awesome-phonenumber';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/pro-solid-svg-icons';
import PhoneIcon from '../PhoneIcon';
import styles from './Keypad.module.scss';

const newPhoneNumber = value => new PhoneNumber(value, 'US');
const phoneNumber = value =>
    newPhoneNumber(value).getNumber('national') || value;
const phoneUri = value =>
    newPhoneNumber(value).getNumber('rfc3966') || `tel:${value}`;

const Keypad = ({ router, pushRoute }) => {
    const matchSelector = createMatchSelector('/keypad/:numberPath?');
    const {
        params: { numberPath = '' }
    } = matchSelector({ router });

    const [number, setNumber] = useState(phoneNumber(numberPath));

    let numberInput = React.createRef();

    // TEMP: Performing check for numberInput.focus while ref appears to be broken
    const focusNumberInput = () =>
        !isMobile && numberInput.focus && numberInput.focus();

    const handleInputChange = ({ target: { value } }) =>
        setNumber(phoneNumber(value));

    const handleNumberButton = value => {
        setNumber(phoneNumber(`${number}${value}`));
        focusNumberInput();
    };

    const handleBackspaceButtonClick = () => {
        setNumber(phoneNumber(number.slice(0, -1)));
        focusNumberInput();
    };

    let backspaceButtonTimer;

    const handleBackspaceButtonPress = () => {
        backspaceButtonTimer = setTimeout(clearKeypad, 500);
    };

    const handleBackspaceButtonRelease = () => {
        clearTimeout(backspaceButtonTimer);
    };

    const clearKeypad = () => {
        const keypadPath = '/keypad';
        setNumber('');
        if (router.location.pathname !== keypadPath) pushRoute(keypadPath);
        focusNumberInput();
    };

    const callNumber = event => {
        if (event) event.preventDefault();
        window.open(phoneUri(number), '_top');
    };

    const undefinedNumber = number === '';

    const ButtonRow = ({ children, className = '' }) => (
        <Row
            className={classNames(
                styles.buttonRow,
                'mt-3',
                'mb-sm-4',
                `mb-${document.documentElement.clientHeight >= 635 ? 4 : 3}`,
                className
            )}
        >
            {children}
        </Row>
    );

    const NumberCol = ({ value, label, className = '' }) => (
        <Col>
            <Button
                variant="secondary"
                className={classNames(
                    styles.button,
                    styles.numberButton,
                    className
                )}
                aria-label={value}
                onClick={() => handleNumberButton(value)}
            >
                {value}
                <span className={styles.numberLabel}>{label}</span>
            </Button>
        </Col>
    );

    return (
        <Form onSubmit={callNumber}>
            <Helmet title="Phone » Keypad" />
            {/* Number input */}
            <Form.Control
                size="lg"
                type="tel"
                //autoFocus={!isMobile}
                value={number}
                aria-label="Phone number"
                onChange={handleInputChange}
                className={classNames(styles.input, 'mb-4', 'border-0')}
                ref={numberInput}
            />
            <Container className={styles.root}>
                {/* Number buttons */}
                {
                    [
                        { value: '1' },
                        { value: '2', label: 'ABC' },
                        { value: '3', label: 'DEF' },
                        { value: '4', label: 'GHI' },
                        { value: '5', label: 'GHI' },
                        { value: '6', label: 'MNO' },
                        { value: '7', label: 'PQRS' },
                        { value: '8', label: 'TUV' },
                        { value: '9', label: 'WXYZ' },
                        { value: '*', className: 'text-monospace' },
                        { value: '0', label: '+' },
                        { value: '#' }
                    ].reduce(
                        (acc, props, idx) => {
                            acc.buttons.push(
                                <NumberCol
                                    key={idx}
                                    aria-label={props.value}
                                    {...props}
                                />
                            );
                            if ((idx + 1) % 3 === 0)
                                acc.rows.push(
                                    <ButtonRow key={idx}>
                                        {acc.buttons.slice(idx - 2)}
                                    </ButtonRow>
                                );
                            return acc;
                        },
                        { rows: [], buttons: [] }
                    ).rows
                }
                <ButtonRow>
                    {/* Padding */}
                    <Col>
                        <div className={styles.button} />
                    </Col>
                    {/* Call button */}
                    <Col>
                        <Button
                            type="submit"
                            variant="success"
                            disabled={undefinedNumber}
                            className={classNames(
                                styles.button,
                                styles.callButton
                            )}
                            aria-label={`Call ${number}`}
                            onClick={!undefinedNumber ? callNumber : undefined}
                        >

                            <PhoneIcon height="30px" />
                        </Button>
                    </Col>
                    <Col>
                        {undefinedNumber ? (
                            // Padding
                            <div className={styles.button} />
                        ) : (
                            // Backspace / Clear button
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip
                                        id="tooltip-clear"
                                        className="mb-n3"
                                    >
                                        <small>Hold to clear</small>
                                    </Tooltip>
                                }
                            >
                                <Button
                                    variant="link"
                                    className={classNames(
                                        styles.button,
                                        styles.backspaceButton
                                    )}
                                    aria-label="Backspace / Hold to clear"
                                    onClick={handleBackspaceButtonClick}
                                    onTouchStart={handleBackspaceButtonPress}
                                    onTouchEnd={handleBackspaceButtonRelease}
                                    onMouseDown={handleBackspaceButtonPress}
                                    onMouseUp={handleBackspaceButtonRelease}
                                    onMouseLeave={handleBackspaceButtonRelease}
                                >
                                    <FontAwesomeIcon icon={faBackspace} />
                                </Button>
                            </OverlayTrigger>
                        )}
                    </Col>
                </ButtonRow>
            </Container>
        </Form>
    );
};

Keypad.propTypes = {
    router: shape({
        location: shape({
            pathname: string.isRequired
        }).isRequired
    }).isRequired,
    pushRoute: func.isRequired
};

const mapStateToProps = ({ router }) => ({
    router
});

export default connect(
    mapStateToProps,
    { pushRoute: push }
)(Keypad);
