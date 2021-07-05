import React, { useState } from 'react'
import { Container, Form } from 'semantic-ui-react'
import axios from 'axios'

import { SERVER } from '../util';
import { User } from '../tipovi';


axios.defaults.withCredentials = true;
interface Props {
    setUser: (user: User) => void
}

export default function Register(props: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setlLastname] = useState('');
    const [passError, setPassError] = useState('')
    const onSubmit = async () => {
        if (password !== confirmPassword) {
            setPassError('Passwords do not match');
            return;
        }
        setPassError('');
        try {
            const result = await axios.post(SERVER + '/register', {
                email: email,
                password: password,
                firstName: firstname,
                lastName: lastname
            })
            props.setUser(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <Form onSubmit={onSubmit} size='big'>
                <Form.Input value={firstname} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setFirstname(value);
                }} required label='First name' />
                <Form.Input value={lastname} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setlLastname(value);
                }} required label='Last name' />
                <Form.Input value={email} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setEmail(value);
                }} required label='email' />
                <Form.Input type='password' value={password} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setPassword(value);
                }} required label='Password' />
                <Form.Input type='password' value={confirmPassword} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setConfirmPassword(value);
                }} required error={passError || undefined} label='Repeat password' />
                <Form.Button fluid>Register</Form.Button>
            </Form>
        </Container>
    )
}
