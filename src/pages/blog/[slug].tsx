import { Fragment } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

//Apollo
import { useQuery } from "@apollo/client";
import { initializeApollo, addApolloState } from "@/Apollo/client";
import { GET_SINGLE_BLOG } from "@/Apollo/Query/blog.query";
import { GetSingleBlogData } from "@/Apollo/Types/blog.types";

//Components
import Title from "@/Components/Blog/Title";
import Images from "@/Components/Blog/Image";
import Description from "@/Components/Blog/Description";
import Shares from "@/Components/Blog/Shares";
import AddComment from "@/Components/Blog/AddComment";
import Comment from "@/Components/Blog/Comment";

//Seo
import BlogSeo from "@/Utils/BlogSeo";

//404
import NotFound from "@/Components/Common/NotFound";

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";


const SingleBlog = () => {
    //Initialize Hook
    const router = useRouter();

    //Apollo
    const { data } = useQuery<GetSingleBlogData>(GET_SINGLE_BLOG, { variables: { slug: router.query.slug } });

    return (
        <Layout>
            <BlogSeo />
            <Container className="pt-40 smd:pt-40 xxs:pt-32 pb-16">
                {data?.blog ? (
                    <Fragment>
                        <Title />
                        <Images />
                        <Description />
                        <Shares />
                        <AddComment />
                        <Comment />
                    </Fragment>
                ) : (
                    <NotFound />
                )}
            </Container>
        </Layout>
    );
};

export default SingleBlog;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient = initializeApollo()
    await apolloClient.query({
        query: GET_SINGLE_BLOG,
        variables: { slug: ctx.query.slug },
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