import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_SINGLE_BLOG } from "@/Apollo/Query/blog.query";
import { GetSingleBlogData } from "@/Apollo/Types/blog.types";

const Title = () => {
    //Initialize Hook
    const router = useRouter();

    //Apollo
    const { data } = useQuery<GetSingleBlogData>(GET_SINGLE_BLOG, { variables: { slug: router.query.slug } });

    return (
        <div>
            <div className="flex gap-10 items-center">
                <Link href={`/category/${data?.blog.category.slug}`} className="flex gap-2 items-center bg-teal-500 py-1.5 px-2 rounded text-white">
                    <Image src={data?.blog?.category?.image?.url as string} alt={data?.blog.category.name as string} width={30} height={30} className="rounded-full" />
                    <p className="font-medium text-base">{data?.blog.category.name}</p>
                </Link>
                <div>
                    <p className="opacity-60 text-lg">
                        {moment(data?.blog.createdAt).format('MMMM D, YYYY')}
                    </p>
                </div>
            </div>
            <h1 className="text-4xl font-bold my-5">{data?.blog?.title}</h1>
            <div className="my-4 grid grid-cols-2 items-center">
                <div className="flex gap-2 items-center">
                    <Image src={data?.blog.createdBy.picture as string} width={25} height={25} alt={data?.blog.createdBy.name as string} className="rounded-full" />
                    <p>{data?.blog.createdBy.name}</p>
                </div>
                <div className="flex gap-5 items-center opacity-60">
                    <div className="flex gap-1.5 items-center">
                        <Icon icon="basil:comment-outline" className="text-lg" />
                        <p className="text-base">{data?.blog.comments.length} comments</p>
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <Icon icon="ant-design:like-outlined" className="text-lg" />
                        <p className="text-base">{data?.blog.like || 0} likes</p>
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <Icon icon="ant-design:dislike-outlined" className="text-lg" />
                        <p className="text-base">{data?.blog.dislike || 0} dislikes</p>
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <Icon icon="solar:eye-broken" className="text-lg" />
                        <p className="text-base">{data?.blog.view || 0} views</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Title;