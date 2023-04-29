import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Components
import Blog from "@/Components/Categories/Blog";

//Seo
import SiteSeo from "@/Utils/SiteSeo";

//Apollo
import { initializeApollo, addApolloState } from "@/Apollo/client";
import { GET_CATEGORY_BLOG } from "@/Apollo/Query/category.query";

const Category = () => {
    return (
        <Layout>
            <SiteSeo title="Categories" />
            <Container className="pt-40 pb-16">
                <Blog />
            </Container>
        </Layout>
    );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient = initializeApollo()
    await apolloClient.query({
        query: GET_CATEGORY_BLOG,
        variables: { first: 8, skip: 0, orderBy: "id_DESC", slug: ctx.query.slug },
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