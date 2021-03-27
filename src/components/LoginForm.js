import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../graphql/queries";

const LoginForm = ({setError, setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        }
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            setError(null);
            localStorage.setItem('phonenumbers-user-token', token);
        }

        // eslint-disable-next-line
    }, [result.data]);

    const submit = e => {
        e.preventDefault();
        login({
            variables: {
                username, password
            }
        });
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
                    <input type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    password
                    <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    );
};

export default LoginForm;