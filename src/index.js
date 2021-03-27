import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('phonenumbers-user-token');
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null
        }
    };
});

const httpLink = new HttpLink({uri: 'http://localhost:4000'});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
