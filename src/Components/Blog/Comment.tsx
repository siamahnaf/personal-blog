import { useRouter } from "next/router";
import Image from "next/image";
import Avatar from "boring-avatars";
import moment from "moment";

//Apollo
import { client } from "@/Apollo/mutate";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "@/Apollo/Query/blog.query";
import { GetCommentData } from "@/Apollo/Types/blog.types";


const Comment = () => {
    //Initialize Hook
    const router = useRouter();

    //Apollo
    const { data, error, loading } = useQuery<GetCommentData>(GET_COMMENTS, { variables: { slug: router.query.slug }, client });

    if (loading) {
        <div className="mt-6">
            {[...Array(8)].map((_, i) => (
                <div className={`w-full h-[80px] ${([...Array(8)].length - 1) === i ? "mb-0" : "mb-2"}`} key={i}>
                    <div className="animate-pulse h-full">
                        <div className="w-full bg-gray-300 h-full rounded-md ">
                        </div>
                    </div>
                </div>
            ))}
        </div>
    }
    if (error) {
        <div className="mt-4">
            <p className="text-red-600">{error.message}</p>
        </div>
    }
    return (
        <div>
            {data?.comments.map((item, i) => (
                <div key={i} className="my-8">
                    <div className="flex gap-4 items-center">
                        <div>
                            <Avatar
                                size={80}
                                name={item.name}
                                variant="beam"
                                colors={["#F1ECDF", "#D4C9AD", "#C7BA99", "#000000", "#F58723"]}
                            />
                        </div>
                        <div>
                            <p className="text-base opacity-70 mb-2">{item.description}</p>
                            <div className="flex gap-8 items-center">
                                <h5 className="text-lg font-semibold">{item.name}</h5>
                                <p className="text-sm opacity-60">{moment(item.createdAt).format('MMMM D, YYYY')}</p>
                            </div>
                        </div>
                    </div>
                    {item.reply &&
                        <div className="flex gap-4 items-center ml-24 mt-8">
                            <div>
                                <Image src={item.updatedBy.picture} alt={item.updatedBy.name} width={65} height={65} className="rounded-full" placeholder="blur" blurDataURL={item.updatedBy.picture} />
                            </div>
                            <div>
                                <p className="text-base opacity-70 mb-1.5">{item.reply}</p>
                                <div className="flex gap-8 items-center">
                                    <h5 className="text-lg font-semibold">{item.updatedBy.name}</h5>
                                    <p className="text-sm opacity-60">{moment(item.updatedAt).format('MMMM D, YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};

export default Comment;