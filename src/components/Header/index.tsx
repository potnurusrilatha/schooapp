import Logo from "../Logo";
import AccountLinks from "../AccountLinks";
import Search from "../Search";

const Header = () => {  
    return (
        <header className="w-full mb-4 flex items-center justify-between flex-wrap">
            <Logo />
            <Search />
            <AccountLinks />
            <div className="mt-4 mx-auto w-[90%] border-b-4"></div>
        </header>
        
      
    )
}
export default Header;