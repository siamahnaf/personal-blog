import Head from "next/head";
import { useRouter } from "next/router";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_SINGLE_BLOG } from "@/Apollo/Query/blog.query";
import { GetSingleBlogData } from "@/Apollo/Types/blog.types";

const BlogSeo = () => {
    //Initialize Hook
    const router = useRouter();

    //Apollo
    const { data } = useQuery<GetSingleBlogData>(GET_SINGLE_BLOG, { variables: { slug: router.query.slug } });

    return (
        <Head>
            <meta property="og:url" content="https://www.blog.siamahnaf.com/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={data?.blog?.seoTitle} />
            <meta property="og:description" content={data?.blog?.seoDescription} />
            <title>{data?.blog?.title}</title>
            <meta name="description" content={data?.blog?.seoDescription} />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="keywords" content={data?.blog?.kewwords} />
            <meta name="author" content="Siam Ahnaf" />
        </Head>
    );
};

export default BlogSeo;