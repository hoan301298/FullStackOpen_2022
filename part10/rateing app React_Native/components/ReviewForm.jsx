import { useHistory } from 'react-router-native';
import { View } from 'react-native';
import * as yup from 'yup';
import * as React from 'react';

import useReview from '../hooks/useReview';
import FormikTextInput from './FormikTextInput';
import  Button from './Button';
import { Formik } from 'formik';

const ReviewForm = ({onSubmit}) => {
    return (
        <View>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="text" placeholder="Review" />
            <Button onPress={onSubmit}>Create a review</Button>
        </View>
    )
}

const Review = () => {
    const [createReview] = useReview();
    const history = useHistory();

    const onSubmit = async ( values ) => {
        const {ownerName, repositoryName, text} = values;
        const rating = parseInt(values.rating);
        const payload = await createReview({
            ownerName,
            repositoryName,
            rating,
            text
        });

        const { repositoryId } = payload.data.createReview;

        history.push(`/${repositoryId}`);
    }

    return <ReviewContainer onSubmit={onSubmit} />
}

const ReviewContainer = ({onSubmit}) => {
    const initialValues = {
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: ""
    }

    const validationSchema = yup.object().shape({
        ownerName: yup.string().required('Repository ownername is required'),
        repositoryName: yup.string().required("Repository name is required"),
        rating: yup.number().min(0).max(100).required("Rating between 0 and 100 is required"),
        text: yup.string()
    });

    return (
        <Formik initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
            {({handleSubmit}) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default Review;