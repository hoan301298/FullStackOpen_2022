import { useMutation, useApolloClient } from "@apollo/client";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage(AuthStorageContext);
    const [mutate, {data}] = useMutation(AUTHORIZE);
    const apolloClient = useApolloClient(); 
    const signIn = async ({username, password}) => {
        const {data} = await mutate({ variables: {username, password}});
        await authStorage.setAccessToken(data.authorize.accessToken);
        apolloClient.resetStore();
    }

    return [signIn, data]
}

export default useSignIn;