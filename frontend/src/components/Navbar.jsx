import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="
        sticky top-0 z-40
        bg-bg/80 backdrop-blur-md
        border-b border-border
      "
    >
      <div className="px-4 sm:px-6 h-14 flex items-center">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight select-none"
        >
          <span className="text-text-primary">Camp</span>
          <span className="text-accent">Fire</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
