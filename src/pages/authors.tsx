import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Layout
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Seo
import SiteSeo from "@/Utils/SiteSeo";

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
            <SiteSeo title="Author" />
            <Container className="pt-40 smd:pt-40 xxs:pt-32 pb-16 text-center">
                <div className="bg-teal-500 w-[90%] mx-auto rounded pt-24 smd:pt-24 lsm:pt-16 msm:pt-14 sm:pt-12 xxs:pt-10">
                    <Image src="/about.png" alt="Siam Ahnaf" width={1104} height={1505} className="w-5/12 smd:w-5/12 lsm:w-[50%] msm:w-[60%] sm:w-[70%] xs:w-[80%] xxs:w-[85%] mx-auto" />
                </div>
                <h3 className="text-4xl smd:text-4xl msm:text-3xl xxs:text-2xl text-center font-bold my-4">I’m Siam Ahnaf, A content writer based in LDN, currently a Full Stack Web Developer</h3>
                <ul className="flex gap-2 justify-center my-6">
                    {Socials.map((item, i) => (
                        <li key={i}>
                            <Link href={item.url} className="w-12 h-11 mx-auto border border-white border-solid flex items-center transition-all justify-center rounded-lg hover:border-teal-500 hover:bg-teal-500 hover:text-white">
                                <Icon icon={item.icon} className="text-xl" />
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="text-lg opacity-90 w-5/6 sm:w-5/6 xxs:w-full mx-auto mb-6">
                    A content writer with over 12 years experience working across brand identity, publishing and digital products. Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget.
                </p>
                <p className="text-lg opacity-90 w-5/6 sm:w-5/6 xxs:w-full mx-auto">Purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
            </Container>
        </Layout>
    );
};

export default Authors;