import { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { CampContext } from "../context/authContext";

const FloatingCreateButton = () => {
  const { setOpen } = useContext(CampContext);

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Create new post"
      className="
        fixed z-40
        right-4 bottom-20 sm:bottom-8
        px-4 h-12
        rounded-full
        bg-accent hover:bg-accent-hover
        text-black
        flex items-center gap-2
        shadow-xl
        transition-all
        hover:scale-105 active:scale-95
        text-sm font-semibold
      "
    >
      <FiPlus className="w-5 h-5" />
      Create Post
    </button>
  );
};

export default FloatingCreateButton;
