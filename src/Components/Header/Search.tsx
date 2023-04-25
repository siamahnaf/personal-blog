import { useContext } from "react";
import { Icon } from "@iconify/react";

//Context
import { HeaderContext } from "@/Context/header.context";

const Search = () => {
    //Context
    const { setSearch } = useContext(HeaderContext);

    return (
        <div>
            <a onClick={() => setSearch(true)} className="cursor-pointer select-none">
                <Icon icon="material-symbols:search-rounded" className="ml-auto text-2xl" />
            </a>
        </div>
    );
};

export default Search;