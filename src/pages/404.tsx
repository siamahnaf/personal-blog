import NotFound from "@/Components/Common/NotFound";
import { mulish } from "@/Fonts";

const ErrorPage = () => {
    return (
        <div style={{ fontFamily: mulish.style.fontFamily }} className="flex justify-center items-center w-full h-screen">
            <NotFound button />
        </div>
    );
};

export default ErrorPage;