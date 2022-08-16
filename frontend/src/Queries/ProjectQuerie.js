import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    query {
            projects{
                id
                name
            }
        }
`;

export {GET_PROJECTS};