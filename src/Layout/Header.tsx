import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import Container from "@/Components/Common/Container";
import Logo from "@/Components/Header/Logo";
import Navs from "@/Components/Header/Navs";
import Search from "@/Components/Header/Search";

//Context
import { HeaderContext } from "@/Context/header.context";

//Interface
interface Inputs {
    search: string;
}

const Header = () => {
    //State
    const [search, setSearch] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState(false);

    //Initialize Hook
    const router = useRouter();

    //Handle Scroll
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    //Forms
    const {
        register,
        handleSubmit
    } = useForm<Inputs>();

    //On Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        router.push(`/search?key=${value.search.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`)
    }

    //Lifecycle Hooks
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className={`fixed top-0 left-0 w-full bg-white z-50 ${isScrolled ? "shadow-[0_10px_30px_rgba(22,28,45,.1)]" : ""}`}>
            <Container>
                <HeaderContext.Provider value={{ search, setSearch }}>
                    <div className={`grid grid-cols-4 gap-2 items-center relative transition-all ${isScrolled ? "py-6" : "py-14"}`}>
                        <Logo />
                        <Navs />
                        <Search />
                        <form className={`absolute top-0 left-0 right-0 bottom-0  transition-all ${search ? "visible opacity-100" : "invisible opacity-0"}`} onSubmit={handleSubmit(onSubmit)}>
                            <input placeholder="Type and hit enter" className="w-full h-full text-lg placeholder:text-black placeholder:text-opacity-80 py-2 px-3 focus:outline-none" {...register("search", { required: true })} />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setSearch(false)}>
                                <Icon icon="mdi:close-circle-outline" className="text-xl" />
                            </button>
                        </form>
                    </div>
                </HeaderContext.Provider>
            </Container>
        </header>
    );
};

export default Header;