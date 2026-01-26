import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { FaUserGroup } from "react-icons/fa6";
import { handleError } from "../notify/Notification";

const YourCamp = () => {
  const { setLoading, yourCamp, setYourCamp } = useContext(AuthContext);
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKNED_URL}/api/v1/camp/my-camps`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();
        setYourCamp(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  });

  if (!yourCamp) {
    return (
      <div className="p-4 sm:p-5 rounded-xl bg-[#111113] border border-[#1f1f23] text-[#a3a3a3]">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          Your Camps
        </h2>
        <p className="mt-1 text-xs sm:text-sm">
          Camps you’ve joined will appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        sm:max-w-sm
        bg-[#111113]
        border border-[#1f1f23]
        rounded-2xl
        p-3 sm:p-5
        transition-all
        sm:m-2
        hover:border-orange-500
      "
    >
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        {yourCamp.category.map((cat, index) => (
          <span
            key={index}
            className="
              px-2 py-0.5
              text-[10px] sm:text-xs
              rounded-full
              bg-[#18181b]
              border border-[#27272a]
              text-gray-300
            "
          >
            {cat}
          </span>
        ))}

        <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-orange-500/10 text-orange-400">
          ⏳ {new Date(yourCamp.burnAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="text-white font-semibold text-sm sm:text-lg leading-snug">
        {yourCamp.title}
      </h3>

      <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2 sm:line-clamp-3">
        {yourCamp.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 sm:mt-4 text-[11px] sm:text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <FaUserGroup className="text-[12px] sm:text-[14px]" />
          <span>{yourCamp.totalUsers} members</span>
        </div>
      </div>
    </div>
  );
};

export default YourCamp;
