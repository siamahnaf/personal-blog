import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import moment from "moment";

//Urql
import { useQuery } from "urql";
import { GET_BLOGS_POST } from "@/Urql/Query/blog.query";
import { GetBlogData } from "@/Urql/Types/blog.types";

const Card = () => {
    //Urql
    const [{ data }] = useQuery<GetBlogData>({ query: GET_BLOGS_POST, variables: { first: 8, orderBy: "id_ASC", skip: 0 } });
    return (
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
    );
};

export default Card;