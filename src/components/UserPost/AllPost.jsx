import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IconZoomIn } from "@tabler/icons-react";
import { Heart } from "lucide-react";

const AllPost = ({ posts }) => {
  const [modal, setModal] = useState({ isOpen: false, imageUrls: [], index: 0 });
  const [currentSlide, setCurrentSlide] = useState({});

  const openModal = (images, index) => {
    setModal({ isOpen: true, imageUrls: images, index });
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  const prevImage = () => {
    setModal((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.imageUrls.length) % prev.imageUrls.length,
    }));
  };

  const nextImage = () => {
    setModal((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.imageUrls.length,
    }));
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const activeIndex = currentSlide[post.id] || 0;
        const isLiked = currentSlide[`like_${post.id}`] || false;
        const isCommentOpen = currentSlide[`comment_${post.id}`] || false;

        const dummyComments = [
          { user: "Aarav Mehta", text: "Great post! Very helpful." },
          { user: "Neha Sharma", text: "Thanks for sharing this info." },
          { user: "Rahul Verma", text: "Can you explain more about tags?" },
          { user: "Simran Kaur", text: "Looking forward to more posts like this." },
          { user: "Yash Patel", text: "Amazing insights, keep it up!" },
        ];

        return (
          <div key={post.id} className="bg-white border rounded-2xl p-6 shadow-md transition hover:shadow-lg relative">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{post.title}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 ${
                  post.role === "ROLE_ADMIN" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {post.role.replace("ROLE_", "")}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-2 line-clamp-3">{post.description}</p>

            <div className="flex flex-wrap gap-2 mt-1">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
              {post.courseType && <span className="font-medium text-purple-600">Course: {post.courseType}</span>}
              <span>Status: {post.status}</span>
            </div>

            {/* Images */}
            {post.imageUrls?.length > 0 && (
              <div className="mt-4 relative overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                    width: `${post.imageUrls.length * 100}%`,
                  }}
                >
                  {post.imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 cursor-pointer relative"
                      onClick={() =>
                        openModal(post.imageUrls.map((u) => `http://localhost:8084${u}`), index)
                      }
                    >
                      <img
                        src={`http://localhost:8084${url}`}
                        alt={`Post ${post.id} Image ${index + 1}`}
                        className="w-full h-52 object-cover rounded-xl"
                      />
                      <div className="absolute bottom-2 right-2 bg-white bg-opacity-70 p-1 rounded-full">
                        <IconZoomIn size={16} className="text-gray-600" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image Nav Arrows */}
                {post.imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentSlide((prev) => ({
                          ...prev,
                          [post.id]:
                            (activeIndex - 1 + post.imageUrls.length) % post.imageUrls.length,
                        }))
                      }
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xl bg-black bg-opacity-30 rounded-full p-1"
                    >
                      &#8592;
                    </button>
                    <button
                      onClick={() =>
                        setCurrentSlide((prev) => ({
                          ...prev,
                          [post.id]: (activeIndex + 1) % post.imageUrls.length,
                        }))
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xl bg-black bg-opacity-30 rounded-full p-1"
                    >
                      &#8594;
                    </button>
                  </>
                )}

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {post.imageUrls.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === activeIndex ? "bg-white" : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Like & Comment Icons */}
            <div className="mt-3 flex items-center justify-start gap-6 text-gray-600">
              <button
                onClick={() =>
                  setCurrentSlide((prev) => ({
                    ...prev,
                    [`like_${post.id}`]: !isLiked,
                  }))
                }
                className="flex items-center gap-1"
              >
              {isLiked ? (
      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
    ) : (
      <Heart className="w-5 h-5 text-gray-400" />
    )}
              </button>

              <button
                onClick={() =>
                  setCurrentSlide((prev) => ({
                    ...prev,
                    [`comment_${post.id}`]: !isCommentOpen,
                  }))
                }
                className="flex items-center gap-1"
              >
                <span><FaRegCommentDots /></span>
              </button>
            </div>

            {/* Comments Section */}
            {isCommentOpen && (
              <div className="mt-4 space-y-4 max-h-64 overflow-y-auto pr-2">
                {dummyComments.map((cmt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        cmt.user
                      )}&background=random&size=32`}
                      alt={cmt.user}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-100 px-3 py-2 rounded-xl text-sm w-full">
                      <strong className="block text-gray-800">{cmt.user}</strong>
                      <span className="text-gray-700">{cmt.text}</span>
                    </div>
                  </div>
                ))}

                {/* Comment Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const commentText = e.target.elements[`commentInput_${post.id}`].value.trim();
                    if (!commentText) return;
                    alert(`You commented: ${commentText}`);
                    e.target.reset();
                  }}
                >
                  {/* <div className="flex gap-2 mt-2">
                    <input
                      name={`commentInput_${post.id}`}
                      type="text"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      placeholder="Write a comment..."
                    />
                    <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                      Post
                    </button>
                  </div> */}
                </form>
              </div>
            )}
          </div>
        );
      })}

      {/* Image Modal */}
      {modal.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={modal.imageUrls[modal.index]}
              alt="Zoomed"
              className="w-full h-auto object-contain rounded-xl transition-transform duration-300 scale-100 hover:scale-105"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full p-1"
            >
              &times;
            </button>
            {modal.imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 rounded-full p-2"
                >
                  &#8592;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 rounded-full p-2"
                >
                  &#8594;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPost;
