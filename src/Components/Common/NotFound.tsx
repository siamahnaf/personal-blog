import Link from "next/link";

//Interface
interface Props {
    button?: boolean;
}
const NotFound = ({ button = false }: Props) => {
    return (
        <div className="text-center">
            <h1 className="text-8xl msm:text-8xl sm:text-7xl xs:text-6xl xxs:text-5xl font-black text-teal-500 mb-5">Oops!</h1>
            <p className="text-xl uppercase font-bold mb-3">404- Page Not Found</p>
            <p className="w-1/2 smd:w-1/2 lsm:w-[80%] msm:w-[85%] sm:w-[90%] xxs:w-[95%] mx-auto text-lg opacity-80">The page or content you are looking for might have been removed or had its name changed or is temporarily unavailable.</p>
            <Link href="/" className="bg-teal-500 py-1.5 px-4 rounded text-white mt-3 block w-max mx-auto">
                Home Page
            </Link>
        </div >
    );
};

export default NotFound;