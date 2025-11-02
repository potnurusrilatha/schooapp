const Navigation = () => {
    return (
        <nav className="flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-500 font-medium">Home</a>
            <a href="/destinations" className="text-gray-700 hover:text-blue-500 font-medium">Destinations</a>
            <a href="/tours" className="text-gray-700 hover:text-blue-500 font-medium">Tours</a>
            <a href="/about" className="text-gray-700 hover:text-blue-500 font-medium">About Us</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-500 font-medium">Contact</a>
        </nav>
    );
}

export default Navigation;
