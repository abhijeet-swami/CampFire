import React from "react";

const CreateCamp = () => {
  const categories = [
    "Tech",
    "Art",
    "News",
    "Sports",
    "Nature",
    "Photography",
    "Music",
    "Gaming",
    "Educaton",
    "Startup",
  ];

  return (
    <div className="w-full md:w-4/5 lg:w-1/2 h-fit m-5 mx-auto px-5 py-5 flex flex-col justify-center bg-[#111113] rounded-md border border-[#1f1f23]">
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-1">Create a Camp</h2>
        <p className="text-sm md:text-sm text-[#a3a3a3]">
          Start a new space around a topic you care about.
        </p>
      </div>
      <form className="space-y-5">
        <div>
          <label
            className="block mb-2 font-semibold text-sm md:text-base"
            htmlFor="camptitle"
          >
            Camp Title
          </label>
          <input
            className="px-2 w-full outline-none bg-[#18181b] border border-[#1f1f23] py-1 md:py-2 rounded-md text-sm md:text-base"
            type="text"
            placeholder="eg. Late Night JavaScript"
          />
        </div>
        <div>
          <label
            className="block mb-2 font-semibold text-sm md:text-base"
            htmlFor="campdesc"
          >
            Description
          </label>
          <textarea
            rows={4}
            className="resize-none px-2 w-full outline-none bg-[#18181b] border border-[#1f1f23] py-1 md:py-2 rounded-md text-sm md:text-base"
            placeholder="What is this camp about?"
          />
        </div>
        <div>
          <label
            className="block mb-2 font-semibold text-sm md:text-base"
            htmlFor="categories"
          >
            Categories (1-3)
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => {
              return (
                <button
                  className="text-[#a3a3a3] hover:text-[#fafafa] border border-[#1f1f23] bg-[#18181b] px-3 md:px-4 py-1 rounded-2xl max-w-fit text-sm md:text-base hover:bg-[#252529] transition-colors"
                  key={index}
                  type="button"
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        <hr className="border-[#1f1f23]" />
        <button
          type="submit"
          className="w-full md:w-auto md:ml-auto block px-4 md:px-6 py-2 md:py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors text-sm md:text-base"
        >
          Create Camp
        </button>
      </form>
    </div>
  );
};

export default CreateCamp;
