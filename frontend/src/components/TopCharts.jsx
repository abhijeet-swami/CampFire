import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { handleError } from "../notify/Notification";
import CampsGrid from "./CampsGrid";
const TopCharts = () => {
  const { trendingCamps, setTrendingCamps, setLoading, topCamps, setTopCamps } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setLoading(true);

        const [trendingRes, topRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKNED_URL}/api/v1/camp/trending`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${import.meta.env.VITE_BACKNED_URL}/api/v1/camp/top`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        const trendingData = await trendingRes.json();
        const topData = await topRes.json();
        setTrendingCamps(trendingData.data.camps);
        setTopCamps(topData.data.camps);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, [setLoading, setTopCamps, setTrendingCamps]);

  if (!trendingCamps || trendingCamps.length === 0) {
    return (
      <div className="p-4 sm:p-5 rounded-xl bg-[#111113] border border-[#1f1f23] text-[#a3a3a3]">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          No Trending Camps Yet
        </h2>
      </div>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-lg font-bold text-white mb-3">🔥 Trending Camps</h2>
        <CampsGrid camps={trendingCamps} />
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-white mb-3">🏆 Top Camps</h2>
        <CampsGrid camps={topCamps} />
      </section>
    </>
  );
};

export default TopCharts;
