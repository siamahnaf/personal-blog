import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import moment from "moment";

//Urql
import { useQuery } from "@apollo/client";
import { GET_BLOGS_POST } from "@/Urql/Query/blog.query";
import { GetBlogData } from "@/Urql/Types/blog.types";


const Card = () => {
    //State
    const [page, setPage] = useState<number>(0)
    //Apollo
    const { data, fetchMore } = useQuery<GetBlogData>(GET_BLOGS_POST, { variables: { first: 8, orderBy: "id_ASC", skip: 0 } });
    //OnLoadMore
    const onLoadMore = (page: number) => {
        setPage(page);
        const skip = (page * 8)
        fetchMore({
            variables: { first: 8, orderBy: "id_ASC", skip: skip }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const onLoadPrevious = () => {
        const skip = (page - 1) * 8
        setPage(page - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchMore({
            variables: { first: 8, orderBy: "id_ASC", skip: skip }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const onLoadNext = () => {
        const skip = (page + 1) * 8
        setPage(page + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchMore({
            variables: { first: 8, orderBy: "id_ASC", skip: skip }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
    }
    return (
        <div>
            <div className="grid grid-cols-2 gap-10">
                {data?.blogsConnection.edges.map((item, i) => (
                    <div key={i}>
                        <Image src={item.node.ogImage.url} alt={item.node.title} width={800} height={200} style={{ width: "100%", height: "300px" }} className="rounded-lg" />
                        <div className="my-3 grid grid-cols-2">
                            <div className="flex gap-2 items-center">
                                <Image src={item.node.createdBy.picture} width={25} height={25} alt={item.node.createdBy.name} className="rounded-full" />
                                <p>{item.node.createdBy.name}</p>
                            </div>
                            <div className="flex gap-2 justify-end items-center">
                                <Icon icon="mdi:alarm-clock" />
                                <p>{moment(item.node.createdAt).format('DD MMM YYYY')}</p>
                            </div>
                        </div>
                        <Link href={`/blog/${item.node.slug}`} className="text-2xl font-semibold transition-all hover:text-teal-500 line-clamp-1" title={item.node.title}>{item.node.title}</Link>
                        <p className="opacity-80 text-base mt-3 line-clamp-3">{item.node.excerpt}</p>
                    </div>
                ))}
            </div>
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
        </div >
    );
};

export default Card;