import type { GetServerSideProps } from "next"

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Components
import Card from "@/Components/Home/Card";

//Graphql
import { initializeApollo, addApolloState } from "@/Apollo/client";
import { GET_BLOGS_POST } from "@/Apollo/Query/blog.query";

//Seo
import SiteSeo from "@/Utils/SiteSeo";

const Home = () => {
  return (
    <Layout>
      <SiteSeo />
      <Container className="pt-40 smd:pt-40 xxs:pt-32 pb-16">
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
    variables: { first: 8, orderBy: "id_DESC", skip: 0, search: "" },
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