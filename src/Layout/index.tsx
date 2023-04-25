//Components
import Header from "./Header";
import Footer from "./Footer";

//Fonts
import { mulish } from "@/Fonts";

//Interface
interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <main className={`${mulish.variable} font-sans`}>
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default Layout;