import { Outlet, useLocation } from "react-router-dom";

const WorkSpace = () => {
  const { pathname } = useLocation();

  const isDiscussionPage = pathname.includes("/post/");

  return (
    <div
      className={`
        flex-1 w-full
        h-[calc(100vh-49px)]
        p-2 mt-5
        overflow-y-auto scrollbar-hide
        text-white
        ${
          isDiscussionPage
            ? "pb-0"
            : "pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0"
        }
      `}
    >
      <Outlet />
    </div>
  );
};

export default WorkSpace;
