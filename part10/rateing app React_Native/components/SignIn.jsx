import React from 'react';
import Text from './Text';
import { Formik } from 'formik';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='username' style={styles.inputText} testID='Username'/>
      <FormikTextInput name='password' placeholder='password' secureTextEntry={true} style={styles.inputText} testID='Password'/>
      <Pressable onPress={onSubmit} style={styles.button} testID='Login'>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  )
};



export const SignInContainer = ({onSubmit}) => {

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });


  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async ({username, password}) => {
    try {
      await signIn({username, password});
      history.push('/')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SignInContainer onSubmit={onSubmit} />
  )
}

export default SignIn;