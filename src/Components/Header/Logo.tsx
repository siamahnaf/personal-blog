import Image from "next/image";

const Logo = () => {
    return (
        <div>
            <Image src="/logo.webp" alt="Logo" width={640} height={108} className="w-[60%]" />
        </div>
    );
};

export default Logo;