import { API_BASE_URL } from './api';

// Story Protocol API Configuration
export const STORY_API_URL = `${API_BASE_URL}/api`;

// GraphQL queries
export const GET_NFTS_QUERY = `
  query GetNFTs($owner: String!) {
    nfts(where: { owner: $owner }) {
      id
      name
      description
      image
      attributes {
        trait_type
        value
      }
    }
  }
`;

export const CREATE_NFT_MUTATION = `
  mutation CreateNFT($input: CreateNFTInput!) {
    createNFT(input: $input) {
      id
      name
      description
      image
    }
  }
`; 