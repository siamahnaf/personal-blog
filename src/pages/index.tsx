import type { GetServerSideProps } from "next"

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Components
import Card from "@/Components/Home/Card";

//Urql
import { initializeApollo, addApolloState } from "@/Urql/client";
import { GET_BLOGS_POST } from "@/Urql/Query/blog.query";

const Home = () => {
  return (
    <Layout>
      <Container className="pt-40 pb-16">
        <Card />
      </Container>
    </Layout>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: GET_BLOGS_POST,
    variables: { first: 8, orderBy: "id_ASC", skip: 0 },
    context: {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS}`
      }
    },
    fetchPolicy: "network-only"
  });
  return addApolloState(apolloClient, {
    props: {},
  })
}