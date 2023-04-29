import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

//Apollo
import { client } from "@/Apollo/mutate";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_BLOG, UPDATE_LIKES, UPDATE_DISLIKES } from "@/Apollo/Query/blog.query";
import { GetSingleBlogData, UpdateViewsData } from "@/Apollo/Types/blog.types";

const Shares = () => {
    //State
    const [like, setLike] = useState<number>(0);
    const [dislike, setDislike] = useState<number>(0);
    const [clicked, setClicked] = useState<boolean>(false);

    //Initialize Hook
    const router = useRouter();

    //Apollo
    const { data } = useQuery<GetSingleBlogData>(GET_SINGLE_BLOG, { variables: { slug: router.query.slug } });
    const [updateLikes, likeData] = useMutation<UpdateViewsData>(UPDATE_LIKES, { client });
    const [updateDislikes, DislikeData] = useMutation<UpdateViewsData>(UPDATE_DISLIKES, { client });

    //Lifecycle Hook
    useMemo(() => {
        if (data) {
            setLike(data.blog.like as number)
            setDislike(data.blog.dislike as number)
        }
    }, [data]);

    //Add Likes
    const likes = () => {
        setLike(like + 1);
        setClicked(true);
        updateLikes({ variables: { slug: router.query.slug, like: (data?.blog.like || 0) + 1 } })
    }
    const dislikes = () => {
        setDislike(dislike + 1);
        setClicked(true);
        updateDislikes({ variables: { slug: router.query.slug, dislike: (data?.blog.dislike || 0) + 1 } })
    }
    return (
        <div className="grid grid-cols-2 gap-2 items-center">
            <div>
                <ul className="flex gap-2 mt-4">
                    {data?.blog.kewwords?.split(", ").slice(0, 5).map((item, i) => (
                        <li className="border border-teal-500 border-solid px-2 py-px border-opacity-30 rounded bg-teal-500 bg-opacity-30 cursor-text" key={i}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <ul className="flex gap-6 items-center mt-4 justify-end">
                    <li>
                        <button className="p-2 rounded-md hover:bg-gray-100" onClick={likes} disabled={clicked}>
                            <Icon className="inline text-xl" icon="ant-design:like-outlined" />
                            {" "}{like}
                        </button>
                    </li>
                    <li>
                        <button className="p-2 rounded-md hover:bg-gray-100" onClick={dislikes} disabled={clicked}>
                            <Icon className="inline text-xl" icon="ant-design:dislike-outlined" />
                            {" "}{dislike}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Shares;