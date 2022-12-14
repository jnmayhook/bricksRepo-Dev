import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} exact />
                        <Route path='/LoginForm' element={<LoginForm />} />
                        <Route path='/SignupForm' element={<SignupForm />} />
                        <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>}
                        />
                    </Routes>
                    <Footer />
                </>
            </Router>
        </ApolloProvider>


    );
}

export default App;
