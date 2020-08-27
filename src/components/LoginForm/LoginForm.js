import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './LoginForm.scss';
import AuthApiService from '../../services/auth-api-service';

export default function LoginForm() {
    const [formDataStatus, setFormDataStatus] = useState({
        error: false,
        disabled: true,
    });
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        isLoggedIn: false,
    });

    /** @function updates state with user input
     * and verifies the email and password are not < 1 chars
     */
    const handleChange = (e) => {
        const userInput = e.target;
        setFormDataStatus({
            error: null,
            disabled: false,
        });
        if (userInput.value.length < 1) {
            setFormDataStatus({
                disabled: true,
                error: `${[userInput.name.charAt(0).toUpperCase()]}${[
                    userInput.name.slice(1),
                ]} can not be empty`,
            });
        }
        setUserData({
            ...userData,
            [userInput.name]: userInput.value,
        });
    };

    /** @function submits the form to the API
     * service which fires the fetch call using
     * the target values
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormDataStatus({
            ...formDataStatus,
            error: null,
        });
        const { email, password } = userData;
        AuthApiService.postLogin(email, password)
            .then((data) => {
                setFormDataStatus({ ...formDataStatus, isLoggedIn: true });
                this.props.history.push('/home');
            })
            .catch(
                (err) =>
                    setFormDataStatus({
                        ...formDataStatus,
                        error:
                            err.error.charAt(0).toUpperCase() +
                            err.error.slice(1),
                    }),
                setUserData({
                    ...userData,
                    isLoggedIn: true,
                })
            );
    };

    return (
        <>
            <form
                className='Login__Form'
                id='Login__Form'
                onSubmit={handleSubmit}>
                <h2 className='Login__Header'>Login Here:</h2>
                <div>
                    {formDataStatus.error && (
                        <ErrorMessage error={formDataStatus.error} />
                    )}
                </div>
                <div className='Input__Container'>
                    <label htmlFor='Login__Email'>
                        Email <i className='far fa-envelope'></i>
                    </label>
                    <input
                        onChange={handleChange}
                        type='email'
                        required
                        name='email'
                        id='Login__Email'
                    />
                </div>
                <div className='Input__Container'>
                    <label htmlFor='Login__Password'>
                        Password <i className='fas fa-lock'></i>
                    </label>
                    <input
                        type='password'
                        required
                        name='password'
                        id='Login__Password'
                        onChange={handleChange}
                    />
                </div>
                <input
                    disabled={formDataStatus.disabled ? 'disabled' : ''}
                    type='submit'
                    id='Login__Submit'
                    value='Login'
                />
            </form>
        </>
    );
}
