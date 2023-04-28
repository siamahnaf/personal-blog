import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Notification
import { Notification } from "@/Components/Common/Notification";

//Apollo
import { client } from "@/Apollo/mutate";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "@/Apollo/Query/contact.query";
import { CreateContactData } from "@/Apollo/Types/contact.types";

//Interface
interface Inputs {
    name: string;
    email: string;
    subject: string;
    description: string;
}

const Contact = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Apollo
    const [addContact, { data, loading, error }] = useMutation<CreateContactData>(CREATE_CONTACT, { client, onCompleted: () => setNotification(true) });

    //Forms
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        addContact({ variables: value })
    }

    //Lifecycle Hook
    useEffect(() => {
        if (data?.createContact.id) {
            reset();
        }
    }, [data])
    return (
        <Layout>
            <Container className="pt-40 pb-16">
                {(error || data) &&
                    <Notification
                        open={notification}
                        handleClose={onNotification}
                        severity={error?.message ? "error" : "success"}
                    >
                        {data?.createContact.id ? "Form submitted successfully! I will contact you soon." : error?.message}
                    </Notification>
                }
                <h2 className="text-center text-4xl font-bold mb-8">Contact</h2>
                <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-5">
                        <label htmlFor="name" className="block text-lg font-medium mb-1">
                            Name
                        </label>
                        <input id="name" className={`rounded-md border border-solid focus:outline-none w-full py-2 px-3 ${errors.name ? "border-red-600" : "border-teal-500"}`} {...register("name", { required: true })} />
                    </div>
                    <div className="my-5">
                        <label htmlFor="email" className="block text-lg font-medium mb-1">
                            Email
                        </label>
                        <input id="email" className={`rounded-md border border-solid focus:outline-none w-full py-2 px-3 ${errors.email ? "border-red-600" : "border-teal-500"}`} {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "The email you enter is invalid email!",
                            },
                        })} />
                    </div>
                    <div className="my-5">
                        <label htmlFor="subject" className="block text-lg font-medium mb-1">
                            Subject
                        </label>
                        <input id="subject" className={`rounded-md border border-solid focus:outline-none w-full py-2 px-3 ${errors.subject ? "border-red-600" : "border-teal-500"}`} {...register("subject", { required: true })} />
                    </div>
                    <div className="my-5">
                        <label htmlFor="description" className="block text-lg font-medium mb-1">
                            Description
                        </label>
                        <textarea id="description" className={`rounded-md border border-solid focus:outline-none w-full py-2 px-3 ${errors.description ? "border-red-600" : "border-teal-500"}`} rows={8} {...register("description", { required: true })} />
                    </div>
                    <div>
                        <button className="bg-teal-500 py-2 px-4 font-medium text-white rounded" type="submit">
                            {loading ? "PLEASE WAIT..." : "Submit Now"}
                        </button>
                    </div>
                </form>
            </Container>
        </Layout>
    );
};

export default Contact;