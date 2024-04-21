import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOS } from "../graphql/queries";

const sortOptions = {
    latest_repos: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    highest_rated_repos: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    lowest_rated_repos: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
}

const useRepositories = ({sortedWay, filter, first}) => {
    const [repositories, setRepositories] = useState();
    
    const {data, loading, fetchMore, ...result} = useQuery(GET_REPOS, {
        fetchPolicy: 'cache-and-network',
        variables: { ...sortOptions[sortedWay] , filter, first},
        onCompleted: (data) => {
            setRepositories(data.repositories);
        }
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repositories.pageInfo.endCursor,
            ...variables,
          },
        });
      };

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        error: result.error,
        loading: result.loading,
        ...result
    }
}

export default useRepositories