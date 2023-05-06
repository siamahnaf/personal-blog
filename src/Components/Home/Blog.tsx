import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import moment from "moment";

//Apollo
import { client } from "@/Apollo/mutate"
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOGS_POST, UPDATE_VIEWS } from "@/Apollo/Query/blog.query";
import { GetBlogData, UpdateViewsData } from "@/Apollo/Types/blog.types";

const randomColor = [
    "bg-amber-400", "bg-orange-400", "bg-lime-500", "bg-pink-400", "bg-rose-500", "bg-fuchsia-500", "bg-violet-500", "bg-green-500", "bg-yellow-500"
]


const Blog = () => {
    //State
    const [page, setPage] = useState<number>(0);

    //Initialize Hook
    const router = useRouter();

    //Search Text
    const search = router.query.key?.toString().replace("-", " ")

    //Apollo
    const { data, fetchMore } = useQuery<GetBlogData>(GET_BLOGS_POST, { variables: { first: 8, orderBy: "id_DESC", skip: 0, search }, fetchPolicy: "cache-and-network" });
    const [updateView, updateData] = useMutation<UpdateViewsData>(UPDATE_VIEWS, { client });

    //OnLoadMore
    const onLoadMore = (page: number) => {
        setPage(page);
        const skip = (page * 8)
        fetchMore({
            variables: { first: 8, orderBy: "id_DESC", skip: skip, search }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    //On Load Previous
    const onLoadPrevious = () => {
        const skip = (page - 1) * 8
        setPage(page - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchMore({
            variables: { first: 8, orderBy: "id_DESC", skip: skip, search }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    //On Load Next
    const onLoadNext = () => {
        const skip = (page + 1) * 8
        setPage(page + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchMore({
            variables: { first: 8, orderBy: "id_DESC", skip: skip, search }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
    }

    //OnViewHandler
    const onViewHandler = (slug: string, view: number | null) => {
        updateView({ variables: { slug: slug, view: (view || 0) + 1 } })
    }
    return (
        <div>
            <div className="grid grid-cols-2 smd:grid-cols-2 xxs:grid-cols-1 gap-10">
                {data?.blogsConnection.edges.map((item, i) => (
                    <div key={i}>
                        <div className="relative">
                            <Image src={item.node.ogImage.url} alt={item.node.title} width={800} height={200} className="aspect-[1.9] rounded-lg" placeholder="blur" blurDataURL={item.node.ogImage.url} />
                            <Link href={`/category/${item.node.category.slug}`} className={`absolute bottom-3 right-3 ${randomColor[i]} text-white py-1.5 px-2.5 rounded text-xs font-medium uppercase`}>
                                {item.node.category.name}
                            </Link>
                        </div>
                        <div className="my-3 grid grid-cols-2">
                            <div className="flex gap-2 items-center">
                                <Image src={item.node.createdBy.picture} width={25} height={25} alt={item.node.createdBy.name} className="rounded-full" placeholder="blur" blurDataURL={item.node.createdBy.picture} />
                                <p>{item.node.createdBy.name}</p>
                            </div>
                            <div className="flex gap-2 justify-end items-center">
                                <Icon icon="mdi:alarm-clock" />
                                <p>{moment(item.node.createdAt).format('DD MMM YYYY')}</p>
                            </div>
                        </div>
                        <Link href={`/blog/${item.node.slug}`} className="text-2xl font-semibold transition-all hover:text-teal-500 line-clamp-1" title={item.node.title} onClick={() => onViewHandler(item.node.slug, item.node.view)}>{item.node.title}</Link>
                        <p className="opacity-80 text-base mt-3 line-clamp-3">{item.node.excerpt}</p>
                    </div>
                ))}
            </div>
            {data && data.blogsConnection.aggregate.count > 8 &&
                <div className="text-center mt-12">
                    <ul className="flex gap-3 justify-center items-center">
                        <li>
                            <button className={`border border-solid border-teal-500 w-10 h-11 rounded-md flex justify-center items-center ${page <= 0 ? "cursor-default pointer-events-none" : ""}`} onClick={() => onLoadPrevious()}>
                                <Icon icon="ic:round-chevron-left" className="text-3xl" />
                            </button>
                        </li>
                        {data?.blogsConnection.aggregate.count as number > 8 &&
                            [...Array(Math.ceil(data?.blogsConnection.aggregate.count as number / 8))].map((_, i) => (
                                <li key={i}>
                                    <button className={`border border-teal-500 border-solid rounded-md w-11 h-11 text-lg ${page === i ? "bg-teal-500 text-white" : ""}`} onClick={() => onLoadMore(i)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        <li>
                            <button className={`border border-solid border-teal-500 w-10 h-11 rounded-md flex justify-center items-center ${page >= (Math.ceil(data?.blogsConnection.aggregate.count as number / 8) - 1) ? "cursor-default pointer-events-none" : ""}`} onClick={() => onLoadNext()}>
                                <Icon icon="ic:round-chevron-right" className="text-3xl" />
                            </button>
                        </li>
                    </ul>

                </div>
            }
            {data && data.blogsConnection.edges.length === 0 &&
                <div className="text-center">
                    <h2 className="mb-10 font-bold text-4xl">Search results for <span className="text-teal-500">{router.query.key}</span></h2>
                    <p className="opacity-70 text-2xl">No Search Found!</p>
                </div>
            }
        </div>
    );
};

export default Blog;