import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth';

const SignupForm = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const [AddUser] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await AddUser({
                variables: userFormData
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <>
            <div className="container signup mb-153">
                <div className='row py-5 form-bg'>
                    <h1 className='mb-3'>Sign up to BricksRepo</h1>
                    <p>When you join us you'll be able to</p>
                    <p>
                        <ul>
                            <li>Record your LEGO collections and wanted lists</li>
                            <li>Save instructions manuals</li>
                            <li>Enjoy the site free of advertising</li>
                        </ul>
                    </p>
                    <p>Joining is FREE and we will not use your email address for anything other than managing your account.</p>

                    <p>Simply choose a username and enter your email address in the form below and we'll send you an email with a password.</p>
                    <p>Already have an account? <Link to="/LoginForm" className='blue'>Log in</Link>.</p>
                    <div className='col-7 mt-3'>
                        <h2 className='mb-3'>Your details</h2>
                        {/* This is needed for the validation functionality above */}
                        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                            {/* show alert if server response is bad */}
                            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                                Something went wrong with your signup!
                            </Alert>

                            <Form.Group>
                                <Form.Label htmlFor='username'>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Your username'
                                    name='username'
                                    onChange={handleInputChange}
                                    value={userFormData.username}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor='email'>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Your email address'
                                    name='email'
                                    onChange={handleInputChange}
                                    value={userFormData.email}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor='password'>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Your password'
                                    name='password'
                                    onChange={handleInputChange}
                                    value={userFormData.password}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                                type='submit'
                                variant='success'>
                                Submit
                            </Button>
                        </Form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupForm;
