import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient, useQuery } from '@apollo/client';
import { CHECK_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "black",
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const {loading, data} = useQuery(CHECK_USER, {
    fetchPolicy: 'cache-and-network'
  });

  const handleLogOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  if(loading) return <Text>Loading...........</Text>

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <View style={{flex : 1}}>
        <Link to='/'>
          <Text style={styles.text}>
            Repositories
          </Text>
        </Link>
      </View>
      {!data.authorizedUser ? 
      <>
        <View style={{flex: 1}}>
          <Link to='/login'>
            <Text style={styles.text}>
              Login
            </Text>
          </Link>
        </View>
        
        <View style={{flex: 1}}>
          <Link to='/sign_up'>
            <Text style={styles.text}>
              Sign up 
            </Text>
          </Link>
        </View>
      </> 
      :
      <>
        <View style={{flex: 1}}>
          <Link to='/' onPress={handleLogOut}>
            <Text style={styles.text}>
              Logout
            </Text>
          </Link>
        </View>

        <View style={{flex: 1}}>
          <Link to='/review'>
            <Text style={styles.text}>
              Create review 
            </Text>
          </Link>
        </View>
      </> 
      }
      </ScrollView>
    </View>
  ); 
};

export default AppBar;