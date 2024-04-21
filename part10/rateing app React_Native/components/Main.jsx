import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch} from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import RepoAlone from './RepoAlone';
import Review from './ReviewForm';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
            <RepositoryList />
        </Route>
        <Route path='/login'>
            <SignIn />
        </Route>  
        <Route path='/sign_up'>
          <SignUp />
        </Route>
        <Route path='/review'>
          <Review />
        </Route>
        <Route path='/:id'>
          <RepoAlone />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;