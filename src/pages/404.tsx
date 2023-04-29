import NotFound from "@/Components/Common/NotFound";
import { mulish } from "@/Fonts";

//Seo
import SiteSeo from "@/Utils/SiteSeo";

const ErrorPage = () => {
    return (
        <div style={{ fontFamily: mulish.style.fontFamily }} className="flex justify-center items-center w-full h-screen">
            <SiteSeo title="Not Found" />
            <NotFound button />
        </div>
    );
};

export default ErrorPage;