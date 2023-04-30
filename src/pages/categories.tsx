import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Components
import Card from "@/Components/Categories/Card";

//Seo
import SiteSeo from "@/Utils/SiteSeo";

//Graphql
import { initializeApollo, addApolloState } from "@/Apollo/client";
import { GET_CATEGORIES } from "@/Apollo/Query/category.query";

const categories = () => {
    return (
        <Layout>
            <SiteSeo title="Categories" />
            <Container className="pt-40 smd:pt-40 xxs:pt-32 pb-16">
                <Card />
            </Container>
        </Layout>
    );
};

export default categories;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient = initializeApollo()
    await apolloClient.query({
        query: GET_CATEGORIES,
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