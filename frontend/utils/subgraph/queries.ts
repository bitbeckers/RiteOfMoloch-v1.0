import { QueryBuilder } from "../types/subgraph";

export const MY_QUERY = `
query {
  cohorts(first: 5) {
    id
    deployer
    dao
    token
  }
}
`;

// skip = starting index
export const COHORTS: QueryBuilder = () => `
    query {
        cohorts {
            id
            time
            token
            tokenAmount
            dao
            createdAt

        }
    }
`;

/// @notice joinedAt is a unix timestamp
export const COHORT_INITIATES: QueryBuilder = (cohortId: string) => `
      query {
          cohort(id: "${cohortId}") {
                  initiates {
                      id
                      address
                      joinedAt
                      stake
              }
          }
      }
  `;

/// @notice createdAt is a unix timestamp. time is how far in seconds the deadline is from createdAt
export const COHORT_METADATA: QueryBuilder = (id: string) => `
    query {
        cohort(id: "${id}") {
            id
            time
            token
            tokenAmount
            dao
            createdAt
        }
    }
`;
