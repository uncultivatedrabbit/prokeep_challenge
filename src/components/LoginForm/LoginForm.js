import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './LoginForm.scss';
import useLoginForm from '../../hooks/useLoginForm';

export default function LoginForm() {
    const { handleSubmit, formDataStatus, handleChange } = useLoginForm();
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
