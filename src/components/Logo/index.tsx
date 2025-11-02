import Link from "next/link";
import travelLogo from "../../../public/travel-logo.png";
import Image from "next/image";

const Logo = () => {
    return (
        <div className="ml-12"> 
            <Link href="/" className="text-white bg-black px-2 py-4 flex items-center">
                <Image
                    src={travelLogo}
                    alt="Travel Logo"
                    width={100}
                    height={50}
                />
            </Link>
        </div>
    );
};

export default Logo;
