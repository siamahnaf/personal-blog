import { createContext } from "react";

//Types
interface Context {
    search: boolean;
    setSearch: Function;
}

export const HeaderContext = createContext<Context>({
    search: false,
    setSearch: () => false
});