import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="header py-4">
      <div className="container">
        <div className="flex items-center">
          <Logo />
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Header;
