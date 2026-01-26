import { Outlet } from "react-router-dom";

const WorkSpace = () => {
  return (
    <div className="w-full p-2 text-white">
      <Outlet />
    </div>
  );
};

export default WorkSpace;
