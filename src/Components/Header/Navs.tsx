import Link from "next/link";
import { Icon } from "@iconify/react";

//Data
const Navigation = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    {
        name: "Others", dropdown: [
            { name: "Categories", url: "/categories" },
            { name: "Privacy Policy", url: "/privacy-policy" },
            { name: "Authors", url: "/authors" }
        ]
    }
]

const Navs = () => {
    return (
        <div className="col-span-2">
            <ul className="flex gap-8 justify-end">
                {Navigation.map((item, i) => (
                    <li key={i}>
                        {item.url &&
                            <Link href={item.url} className="text-lg font-medium hover:text-teal-500 transition-all">
                                {item.name}
                            </Link>
                        }
                        {item.dropdown &&
                            <div className="flex gap-1 relative items-center cursor-pointer group">
                                <p className="text-lg font-medium group-hover:text-teal-500">{item.name}</p>
                                <Icon className="mt-px text-2xl group-hover:text-teal-500" icon="mdi:chevron-down" />
                                <ul className="absolute top-full bg-white w-40 px-3 py-1 rounded-lg pt-4 shadow-[0_10px_30px_rgba(22,28,45,.1)] invisible translate-y-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    {item.dropdown.map((drop, index) => (
                                        <li key={index} className="my-2">
                                            <Link href={drop.url} className="text-lg font-medium hover:text-teal-500 transition-all">
                                                {drop.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navs;