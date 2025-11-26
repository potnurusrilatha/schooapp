import Link from 'next/link';

const Navigation = () => {
    return (
        <nav className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500 font-medium">
                Home
            </Link>
            <Link href="/destinations" className="text-gray-700 hover:text-blue-500 font-medium">
                Destinations
            </Link>
            <Link href="/tours" className="text-gray-700 hover:text-blue-500 font-medium">
                Tours
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500 font-medium">
                About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500 font-medium">
                Contact
            </Link>
        </nav>
    );
}

export default Navigation;