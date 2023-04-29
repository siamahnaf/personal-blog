import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
query MyQuery {
    categories {
      name
      image {
        url
      }
      slug
      description
    }
}
`;

export const GET_CATEGORY_BLOG = gql`
query MyQuery($first: Int = 10, $skip: Int = 10, $orderBy: BlogOrderByInput = publishedAt_ASC, $slug: String = "") {
    blogsConnection(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where: {category: {slug: $slug}}
    ) {
      edges {
        node {
          category {
            name
            slug
          }
          createdAt
          createdBy {
            name
            picture
          }
          excerpt
          ogImage {
            url
          }
          post {
            html
          }
          slug
          title
          view
        }
      }
      aggregate {
        count
      }
      pageInfo {
        pageSize
        hasNextPage
        endCursor
      }
    }
}
`;