import Link from "next/link";
import { Icon } from "@iconify/react";

//Components
import Container from "@/Components/Common/Container";

//Socials
const Socials = [
    { icon: "bxl:facebook", url: "/" },
    { icon: "bxl:twitter", url: "/" },
    { icon: "bxl:linkedin", url: "/" },
    { icon: "bxl:github", url: "/" },
    { icon: "fa6-solid:s", url: "/" },
]

const Navs = [
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Category", url: "/Category" },
    { name: "Privacy Policy", url: "/privacy-policy" },
]

const Footer = () => {
    return (
        <Container className="bg-gray-800 text-white text-center py-16">
            <ul className="flex gap-10 justify-center">
                {Navs.map((item, i) => (
                    <li>
                        <Link href={item.url} className="opacity-70 hover:opacity-100 transition-all">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex gap-5 justify-center my-11">
                {Socials.map((item, i) => (
                    <li>
                        <Link href={item.url} className="w-12 h-11 mx-auto border border-white border-solid flex items-center transition-all justify-center rounded-lg hover:border-teal-500 hover:bg-teal-500">
                            <Icon icon={item.icon} className="text-xl" />
                        </Link>
                    </li>
                ))}
            </ul>
            <p className="text-base opacity-70">Copyright © {new Date().getFullYear()} a blog site by <Link href="https://www.siamahnaf.com/">Siam Ahnaf</Link></p>
        </Container>
    );
};

export default Footer;