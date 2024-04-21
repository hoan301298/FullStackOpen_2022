import { Formik } from 'formik';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import * as React from 'react';

import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import Button from "./Button"
import FormikTextInput from "./FormikTextInput"

const SignUpForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
            <FormikTextInput name="passConfirmation" placeholder="Password Confirmation" secureTextEntry />
            <Button onPress={onSubmit}>Sign Up</Button>
        </View>
    )
}

const SignUpContainer = ({ onSubmit }) => {
    const initialValues = {
        username: "",
        password: "",
        passConfirmation: ""
    }

    const validationSchema = yup.object().shape({
        username: yup.string().min(1).max(30).required("Username with length 1-30 is required"),
        password: yup.string().min(5).max(50).required("Password with length 5-50 is required"),
        passConfirmation: yup.string().oneOf([yup.ref('password'), null]).required("Password is not matched")
    })

    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async ({username, password}) => {
        await signUp({username, password});
        await signIn({username, password});

        history.push('/');
    }

    return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp;