import Image from "next/image";
import Link from "next/link"

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <Image src="/logo.png" alt="Logo" width={1280} height={270} className="w-[60%]" />
            </Link>
        </div>
    );
};

export default Logo;