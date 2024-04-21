import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeRouter } from 'react-router-native';

import AuthStorage from './utils/authStorage';
import AuthStorageContext from './contexts/AuthStorageContext';
import createApolloClient from './utils/apolloClient';
import Main from './components/Main';
import { ApolloProvider } from '@apollo/client';

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

const App = () => {

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={client}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;