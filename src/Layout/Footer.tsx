import Link from "next/link";
import { Icon } from "@iconify/react";

//Components
import Container from "@/Components/Common/Container";

//Socials
const Socials = [
    { icon: "bxl:facebook", url: "https://www.facebook.com/siamahnaf198/" },
    { icon: "bxl:twitter", url: "https://twitter.com/siamahnaf198" },
    { icon: "bxl:linkedin", url: "https://www.linkedin.com/in/siamahnaf198/" },
    { icon: "bxl:github", url: "https://github.com/siamahnaf" },
    { icon: "fa6-solid:s", url: "https://www.siamahnaf.com/" },
]

const Navs = [
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Categories", url: "/categories" },
    { name: "Privacy Policy", url: "/privacy-policy" },
]

const Footer = () => {
    return (
        <Container className="bg-gray-800 text-white text-center py-16">
            <ul className="flex gap-10 justify-center">
                {Navs.map((item, i) => (
                    <li key={i}>
                        <Link href={item.url} className="opacity-70 hover:opacity-100 transition-all">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex gap-5 justify-center my-11">
                {Socials.map((item, i) => (
                    <li key={i}>
                        <Link href={item.url} className="w-12 h-11 mx-auto border border-white border-solid flex items-center transition-all justify-center rounded-lg hover:border-teal-500 hover:bg-teal-500">
                            <Icon icon={item.icon} className="text-xl" />
                        </Link>
                    </li>
                ))}
            </ul>
            <p className="text-base opacity-70">Copyright © {new Date().getFullYear()} a blog site by <Link href="https://www.siamahnaf.com/" className="hover:text-teal-500">Siam Ahnaf</Link></p>
        </Container>
    );
};

export default Footer;