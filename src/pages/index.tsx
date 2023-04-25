import type { GetServerSideProps } from "next"

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Components
import Card from "@/Components/Home/Card";

//Urql
import { initUrqlClient } from "@/Urql/client";
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
  const { client, ssrCache } = initUrqlClient();
  const { data } = await client.query(
    GET_BLOGS_POST, { first: 8, orderBy: "id_ASC", skip: 0 }, {
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS}`
      },
    },
    requestPolicy: "network-only"
  }).toPromise();
  console.log(data);
  return {
    props: { urqlState: ssrCache?.extractData() }
  }
}