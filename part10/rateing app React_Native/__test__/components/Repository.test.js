import * as React from "react";
import { render } from "@testing-library/react-native";
import { myFormat } from '../../components/RepositoryItem'
import { RepositoryListContainer } from "../../components/RepositoryList"; 

describe("RepositoryList", () => {
    describe("List container", () => {
        it("renders info correctly", () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                  hasNextPage: true,
                  endCursor:
                    "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
                  startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
                },
                edges: [
                  {
                    node: {
                      id: "jaredpalmer.formik",
                      fullName: "jaredpalmer/formik",
                      description: "Build forms in React, without the tears",
                      language: "TypeScript",
                      forksCount: 1619,
                      stargazersCount: 21856,
                      ratingAverage: 88,
                      reviewCount: 3,
                      ownerAvatarUrl:
                        "https://avatars2.githubusercontent.com/u/4060187?v=4",
                    },
                    cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
                  },
                  {
                    node: {
                      id: "async-library.react-async",
                      fullName: "async-library/react-async",
                      description: "Flexible promise-based React data loader",
                      language: "JavaScript",
                      forksCount: 69,
                      stargazersCount: 1760,
                      ratingAverage: 72,
                      reviewCount: 3,
                      ownerAvatarUrl:
                        "https://avatars1.githubusercontent.com/u/54310907?v=4",
                    },
                    cursor:
                      "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
                  },
                ],
              };

            const nodes = repositories.edges.map(edge => edge.node);
            
            const {getByTestId} = render(<RepositoryListContainer repositories={repositories} />)

            

            nodes.forEach(node =>
            {
              [node.forksCount, node.stargazersCount, node.ratingAverage, node.reviewCount] = [node.forksCount, node.stargazersCount, node.ratingAverage, node.reviewCount].map(num => myFormat(num));
              expect(getByTestId(`${node.id}@fullName`)).toHaveTextContent(node.fullName); 
              expect(getByTestId(`${node.id}@description`)).toHaveTextContent(node.description); 
              expect(getByTestId(`${node.id}@language`)).toHaveTextContent(node.language); 
              expect(getByTestId(`${node.id}@forks`)).toHaveTextContent(node.forksCount); 
              expect(getByTestId(`${node.id}@stars`)).toHaveTextContent(node.stargazersCount); 
              expect(getByTestId(`${node.id}@rating`)).toHaveTextContent(node.ratingAverage); 
              expect(getByTestId(`${node.id}@review`)).toHaveTextContent(node.reviewCount);
            })
        })
    })
})