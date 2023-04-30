import { useContext, useState } from "react";
import { Icon } from "@iconify/react";

//Mobile Menu
import MobileNav from "./MobileNav";

//Context
import { HeaderContext } from "@/Context/header.context";

const Search = () => {
    //State
    const [mobile, setMobile] = useState<boolean>(false);

    //Context
    const { setSearch } = useContext(HeaderContext);

    return (
        <div>
            <div className="flex gap-4 items-center justify-end">
                <a onClick={() => setSearch(true)} className="cursor-pointer select-none">
                    <Icon icon="material-symbols:search-rounded" className="ml-auto text-2xl" />
                </a>
                <a onClick={() => setMobile(!mobile)} className="cursor-pointer select-none smd:hidden xxs:block">
                    {
                        mobile ? (
                            <Icon icon="ic:baseline-restaurant-menu" className="ml-auto text-2xl" />
                        ) : (
                            <Icon icon="ic:round-menu" className="ml-auto text-2xl" />
                        )
                    }
                </a>
            </div>
            <MobileNav open={mobile} />
        </div>
    );
};

export default Search;