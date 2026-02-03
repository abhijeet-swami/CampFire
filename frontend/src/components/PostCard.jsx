import { useContext, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { handleError, handleSuccess } from "../notify/Notification";
import { useNavigate } from "react-router-dom";
import { AuthContext, CampContext } from "../context/authContext";

const PostCard = ({ post, campId }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const { loading, setLoading } = useContext(AuthContext);

  const { posts, setPosts } = useContext(CampContext);

  const handleEditPost = async () => {
    if (!editedContent.trim()) {
      handleError("Content cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKNED_URL}/api/v1/post/edit/${post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editedContent,
          }),
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setPosts((prev) =>
          prev.map((p) =>
            p._id === post._id ? { ...p, content: result.data.content } : p,
          ),
        );
        setIsEditing(false);
        setActive(false);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKNED_URL}/api/v1/post/delete/${post._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setPosts(posts.filter((p) => p._id !== post._id));
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <article className="w-full max-w-full sm:max-w-xl md:max-w-2xl xl:max-w-3xl bg-[#0f0f11] border border-[#1f1f23] rounded-lg p-3 sm:p-4 md:p-5 mx-auto">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-400 text-black flex items-center justify-center font-semibold shrink-0">
              {post.userId?.name?.[0]}
            </div>

            <div className="min-w-0">
              <p className="font-semibold leading-tight truncate">
                {post.userId?.name}
              </p>
              <p className="text-sm text-[#a3a3a3] truncate">
                @{post.userId?.username}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setActive(!active)}
              className="p-2 rounded-full hover:bg-[#18181b] shrink-0"
            >
              <FiMoreHorizontal />
            </button>
            {active && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1f1f23] rounded-md shadow-lg z-50">
                <div className="px-2 py-2 space-y-1">
                  <button
                    onClick={() => {
                      setActive(false);
                      setIsEditing(!isEditing);
                    }}
                    disabled={loading}
                    className={`text-white w-full hover:bg-orange-400 hover:text-black block px-3 py-2 rounded-md text-base font-medium ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Edit Post
                  </button>
                  <button
                    onClick={handleDeletePost}
                    disabled={loading}
                    className={`text-white w-full hover:bg-orange-400 hover:text-black block px-3 py-2 rounded-md text-base font-medium ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="mb-3 space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg outline-none bg-[#18181b] border border-[#1f1f23] p-3 text-sm"
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(post.content);
                }}
                className="px-4 py-1.5 rounded-lg bg-gray-600 text-white text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleEditPost}
                disabled={loading}
                className="px-4 py-1.5 rounded-lg bg-orange-400 text-black text-sm font-semibold hover:bg-orange-500 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm sm:text-[15px] leading-relaxed mb-3 whitespace-pre-wrap break-words">
            {post.content}
          </p>
        )}

        {post.images?.length > 0 && (
          <img
            src={post.images[0].url}
            alt="post"
            className="w-full md:max-w-96 mx-auto max-h-64 sm:max-h-64 md:max-h-80 object-center rounded-lg mb-5"
          />
        )}

        <div className="flex justify-between text-sm text-[#a3a3a3]">
          {new Date(post.createdAt).toLocaleString()}

          <div>
            <button
              onClick={() => navigate(`/camp-feed/${campId}/post/${post._id}`)}
              className="w-full flex items-center justify-between text-[#a3a3a3] hover:text-white transition"
            >
              Open discussion
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostCard;
