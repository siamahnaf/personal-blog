import { useRouter } from "next/router";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_SINGLE_BLOG } from "@/Apollo/Query/blog.query";
import { GetSingleBlogData } from "@/Apollo/Types/blog.types";

const Description = () => {
    //Initialize Hook
    const router = useRouter();

    //Apollo
    const { data } = useQuery<GetSingleBlogData>(GET_SINGLE_BLOG, { variables: { slug: router.query.slug } });

    return (
        <div>
            <div className="mt-5 text-lg" dangerouslySetInnerHTML={{ __html: data?.blog.post.html.replace(/<pre>/g, '<pre class="bg-gray-800 text-white py-1 px-2 rounded text-base my-6 cursor-text overflow-auto">').replace(/<h4>/g, '<h4 class="text-3xl font-bold my-4">').replace(/<code>/g, '<code class="bg-gray-800 text-white text-sm px-2 py-1 rounded">') as string }} />
        </div>
    );
};

export default Description;