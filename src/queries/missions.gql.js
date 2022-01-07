import { gql } from '@apollo/client';

export const GET_MISSIONS = gql`
    query getMissions ($limit: Int!){
        missions(limit: $limit) {
            id
            name
            twitter
            website
            wikipedia
            links @client
        }
    }  
`;
