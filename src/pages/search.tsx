import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Components
import Blog from "@/Components/Home/Blog";

//Graphql
import { initializeApollo, addApolloState } from "@/Apollo/client";
import { GET_BLOGS_POST } from "@/Apollo/Query/blog.query";

//Seo
import SiteSeo from "@/Utils/SiteSeo";

const Search = () => {
    return (
        <Layout>
            <SiteSeo title="Search" />
            <Container className="pt-40 smd:pt-40 xxs:pt-32 pb-16">
                <Blog />
            </Container>
        </Layout>
    );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient = initializeApollo()
    await apolloClient.query({
        query: GET_BLOGS_POST,
        variables: { first: 8, orderBy: "id_DESC", skip: 0, search: ctx.query.key?.toString().replace("-", " ") },
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