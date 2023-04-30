import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

//Notifications
import { Notification } from "../Common/Notification";

//Apollo
import { client } from "@/Apollo/mutate";
import { useMutation } from "@apollo/client";
import { ADD_COMMENTS, GET_COMMENTS } from "@/Apollo/Query/blog.query";
import { AddCommentData } from "@/Apollo/Types/blog.types";

//Interface
interface Inputs {
    name: string;
    email: string;
    description: string;
}

const AddComment = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Initialize Hook
    const router = useRouter();

    //Apollo
    const [addComment, { data, loading, error }] = useMutation<AddCommentData>(ADD_COMMENTS, {
        client,
        onCompleted: () => setNotification(true),
        errorPolicy: "all",
        refetchQueries: [{ query: GET_COMMENTS, variables: { slug: router.query.slug } }]
    });

    //UseForm
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        addComment({ variables: { ...value, slug: router.query.slug } })
    }

    //Lifecycle Hook
    useEffect(() => {
        if (data?.createComment.name) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    return (
        <div className="mt-10">
            {(error || data) &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity={error?.message ? "error" : "success"}
                >
                    {data?.createComment.name ? "Comment Added Successfully" : error?.message}
                </Notification>
            }
            <h3 className="text-2xl font-bold mb-5">Comments</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 sm:grid-cols-2 xxs:grid-cols-1 gap-3">
                    <div className="col-span-2 sm:col-span-2 xxs:col-span-1">
                        <textarea className={`border border-solid ${errors.description ? "border-red-600" : "border-teal-500"} w-full focus:outline-none py-1 px-3 rounded placeholder:text-black placeholder:text-opacity-70 placeholder:font-medium`} placeholder="Description" rows={6} {...register("description", { required: true, maxLength: 300 })} />
                    </div>
                    <div>
                        <input className={`border border-solid ${errors.name ? "border-red-600" : "border-teal-500"} w-full focus:outline-none py-1 px-3 rounded placeholder:text-black placeholder:text-opacity-70 placeholder:font-medium`} placeholder="Name" {...register("name", { required: true })} />
                    </div>
                    <div>
                        <input
                            className={`border border-solid ${errors.email ? "border-red-600" : "border-teal-500"} w-full focus:outline-none py-1 px-3 rounded placeholder:text-black placeholder:text-opacity-70 placeholder:font-medium`}
                            placeholder="Email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "The email you enter is invalid email!",
                                },
                            })} />
                    </div>
                </div>
                <div className="mt-5">
                    <button className="bg-teal-500 py-1 px-3 rounded text-base font-medium text-white">
                        {loading ? "PLEASE WAIT..." : "Leave a Comment"}
                    </button>
                </div>
            </form>
            <div>

            </div>
        </div>
    );
};

export default AddComment;