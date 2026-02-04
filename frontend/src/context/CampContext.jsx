import { useEffect, useState } from "react";
import { CampContext } from "./authContext";
import { handleError } from "../notify/Notification";

export const CampContextProvider = ({ children }) => {
  const [campForm, setCampForm] = useState({
    title: "",
    description: "",
    category: [],
  });

  const [yourCamps, setYourCamps] = useState([]);
  const [trendingCamps, setTrendingCamps] = useState([]);
  const [topCamps, setTopCamps] = useState([]);
  const [joinCamps, setJoinCamps] = useState([]);
  const [personalisedCamps, setPpersonalisedCamps] = useState([]);

  const [camp, setCamp] = useState(null);

  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [messagesByPost, setMessagesByPost] = useState({});

  const [cursor, setCursor] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    const fetchYourCamps = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKNED_URL}/api/v1/camp/my-camps`,
          { credentials: "include" },
        );
        const result = await res.json();
        if (res.status === 401) {
          setYourCamps([]);
          return;
        }
        if (result.success) {
          setYourCamps(result.data.camps);
          setJoinCamps(result.data.camps);
        }
      } catch (err) {
        handleError(err);
      }
    };

    fetchYourCamps();
  }, []);

  return (
    <CampContext.Provider
      value={{
        campForm,
        setCampForm,
        yourCamps,
        setYourCamps,
        trendingCamps,
        setTrendingCamps,
        topCamps,
        setTopCamps,
        joinCamps,
        setJoinCamps,
        personalisedCamps,
        setPpersonalisedCamps,
        camp,
        setCamp,
        open,
        setOpen,
        posts,
        setPosts,
        content,
        setContent,
        imagePreview,
        setImagePreview,
        imageFile,
        setImageFile,
        cursor,
        setCursor,
        me,
        setMe,
        messagesByPost,
        setMessagesByPost,
      }}
    >
      {children}
    </CampContext.Provider>
  );
};
