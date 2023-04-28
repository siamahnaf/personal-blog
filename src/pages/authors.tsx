import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Socials
const Socials = [
    { icon: "bxl:twitter", url: "/" },
    { icon: "bxl:linkedin", url: "/" },
    { icon: "bxl:github", url: "/" },
    { icon: "fa6-solid:s", url: "/" }
]

const Authors = () => {
    return (
        <Layout>
            <Container className="pt-40 pb-16 text-center">
                <div className="bg-teal-500 w-[90%] mx-auto rounded pt-24">
                    <Image src="/about.png" alt="Siam Ahnaf" width={1104} height={1505} className="w-5/12 mx-auto" />
                </div>
                <h3 className="text-4xl font-bold my-4">I’m Siam Ahnaf, A content writer based in LDN, currently a Full Stack Web Developer</h3>
                <ul className="flex gap-2 justify-center my-6">
                    {Socials.map((item, i) => (
                        <li key={i}>
                            <Link href={item.url} className="w-12 h-11 mx-auto border border-white border-solid flex items-center transition-all justify-center rounded-lg hover:border-teal-500 hover:bg-teal-500 hover:text-white">
                                <Icon icon={item.icon} className="text-xl" />
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="text-lg opacity-90 w-5/6 mx-auto mb-6">
                    A content writer with over 12 years experience working across brand identity, publishing and digital products. Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget.
                </p>
                <p className="text-lg opacity-90 w-5/6 mx-auto">Purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
            </Container>
        </Layout>
    );
};

export default Authors;