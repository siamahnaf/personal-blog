import { useRouter } from "next/router";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_SINGLE_BLOG } from "@/Apollo/Query/blog.query";
import { GetSingleBlogData } from "@/Apollo/Types/blog.types";

const Images = () => {
    //Initialize Hook
    const router = useRouter();

    //Apollo
    const { data } = useQuery<GetSingleBlogData>(GET_SINGLE_BLOG, { variables: { slug: router.query.slug } });

    return (
        <div className="grid grid-cols-12 gap-2 items-center mt-8">
            <div className="col-span-9">
                <Image src={data?.blog.ogImage.url as string} alt={data?.blog.title as string} width={800} height={200} className="rounded-md" placeholder="blur" blurDataURL={data?.blog.ogImage.url as string} />
            </div>
            <div className="col-span-3">
                <p><Icon icon="bxs:quote-alt-left" className="inline text-3xl mr-1"></Icon>{data?.blog.excerpt}<Icon icon="bxs:quote-alt-right" className="inline text-3xl ml-1 mb-1" /></p>
            </div>
        </div>
    );
};

export default Images;