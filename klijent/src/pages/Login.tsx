import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Button, Container, Form } from 'semantic-ui-react'
import { User } from '../tipovi'
import axios from 'axios';
import { SERVER } from '../util';

axios.defaults.withCredentials = true;
interface Props {
    setUser: (user: User) => void
}

export default withRouter(function Login(props: Props & RouteComponentProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const onSubmit = async () => {
        try {
            const result = await axios.post(SERVER + '/login', { email: email, password: password });
            const user = result.data;
            props.setUser(user);
        } catch (error) {
            setError('Login failed')
        }
    }
    return (
        <Container  >
            <Form onSubmit={onSubmit} error size='big' className='padded' >
                <Form.Input required onChange={(e) => {
                    const value = e.currentTarget.value;
                    setEmail(value);
                }} value={email} label='Email' />
                <Form.Input required onChange={(e) => {
                    const value = e.currentTarget.value;
                    setPassword(value);
                }} value={password} type='password' label='Password' />
                <Form.Button error={error || undefined} primary fluid >Login</Form.Button>
            </Form>
            <br />
            <Button fluid color='instagram' onClick={() => {
                props.history.push('/register')
            }}>Don't have an account?</Button>
        </Container>
    )
})
