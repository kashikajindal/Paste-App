import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="mx-25 m-7">
      <div>
        <input
          className="border outline-none border-gray-400 px-2 rounded-md w-[100%] h-[40px]"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      <div>
        <textarea
          className="mt-8 border border-gray-400 min-w-[300px] focus:border-2 focus:border-blue-700 outline-none p-4 w-[100%]"
          value={paste.content}
          placeholder="Enter content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
