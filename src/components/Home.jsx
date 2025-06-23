import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPaste } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const pasteId = searchParams.get("pasteId");
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, allPaste]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="sm:mx-25 sm:m-7 mx-15 my-7">
      <div className="flex flex-row gap-3 justify-center items-center w-[100%]">
        <input
          className="focus:border-2 focus:border-blue-800 border outline-none border-gray-400 px-2 rounded-md w-[100%] h-[40px]"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="px-2 rounded-md bg-blue-700  w-[30%] h-[40px] text-white text-[12px] sm:text-[14px]">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="min-w-[300px] flex flex-col border border-gray-400 mt-8">
        <div className="flex flex-row gap-1 border-b border-gray-400 p-2">
          <div className="w-[10px] h-[10px] bg-red-600 rounded-full"></div>
          <div className="w-[10px] h-[10px] bg-yellow-200 rounded-full"></div>
          <div className="w-[10px] h-[10px] bg-green-600 rounded-full"></div>
        </div>
        <textarea
          className="focus:border-2 focus:border-blue-700 outline-none p-4"
          value={value}
          placeholder="Write Your Content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
