import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full py-20">
      <FaSpinner className="text-orange-400 text-3xl animate-spin" />
    </div>
  );
};

export default Loader;
