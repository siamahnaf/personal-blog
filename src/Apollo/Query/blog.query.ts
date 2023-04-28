import { gql } from "@apollo/client";

export const GET_BLOGS_POST = gql`
query MyQuery($first: Int, $orderBy: BlogOrderByInput, $skip: Int) {
    blogsConnection(first: $first, orderBy: $orderBy, skip: $skip) {
      edges {
        node {
          category {
            name
            slug
          }
          createdAt
          createdBy {
            picture
            name
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

export const GET_SINGLE_BLOG = gql`
query MyQuery($slug: String = "") {
  blog(where: {slug: $slug}) {
    category {
      name
      image {
        url
      }
      slug
    }
    comments {
      name
      email
      description
      createdAt
    }
    createdAt
    excerpt
    createdBy {
      name
      picture
    }
    dislike
    kewwords
    like
    ogImage {
      url
    }
    post {
      html
    }
    seoTitle
    seoDescription
    title
    view
  }
}
`;


export const ADD_COMMENTS = gql`
mutation MyMutation($email: String = "", $name: String = "", $description: String = "", $slug: String = "") {
  createComment(
    data: {email: $email, name: $name, description: $description, blog: {connect: {slug: $slug}}}
  ) {
    name
  }
}
`;

export const GET_COMMENTS = gql`
query MyQuery($slug: String) {
  comments(stage: DRAFT, where: {blog: {slug: $slug}}, orderBy: id_DESC) {
    email
    description
    name
    reply
    createdAt
    updatedAt
    updatedBy {
      name
      picture
    }
  }
}
`;

export const UPDATE_VIEWS = gql`
mutation MyMutation($view: Int, $slug: String) {
  updateBlog(data: {view: $view}, where: {slug: $slug}) {
    title
  }
  publishBlog(where: {slug: $slug}, to: PUBLISHED) {
    title
  }
}
`;

export const UPDATE_LIKES = gql`
mutation MyMutation($like: Int, $slug: String) {
  updateBlog(data: {like: $like}, where: {slug: $slug}) {
    title
  }
  publishBlog(where: {slug: $slug}, to: PUBLISHED) {
    title
  }
}
`

export const UPDATE_DISLIKES = gql`
mutation MyMutation($dislike: Int, $slug: String) {
  updateBlog(data: {dislike: $dislike}, where: {slug: $slug}) {
    title
  }
  publishBlog(where: {slug: $slug}, to: PUBLISHED) {
    title
  }
}
`