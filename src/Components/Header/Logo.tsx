import Image from "next/image";
import Link from "next/link"

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <Image src="/logo.png" alt="Logo" width={1280} height={270} className="w-[60%] msm:w-[60%] sm:w-[70%] xs:w-[90%] xxs:w-[100%]" />
            </Link>
        </div>
    );
};

export default Logo;