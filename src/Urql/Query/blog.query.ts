import { gql } from "@apollo/client";

export const GET_BLOGS_POST = gql`
query MyQuery($first: Int, $orderBy: BlogOrderByInput, $skip: Int) {
    blogsConnection(first: $first, orderBy: $orderBy, skip: $skip) {
      edges {
        node {
          category {
            name
            image {
              url
            }
          }
          createdAt
          createdBy {
            picture
            name
          }
          dislike
          excerpt
          kewwords
          like
          ogImage {
            url
          }
          post {
            html
          }
          seoDescription
          seoTitle
          slug
          title
          view
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        pageSize
      }
      aggregate {
        count
      }
    }
}
`;