import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div className="mx-25 m-7">
      <div>
        <input
          className="border border-gray-400 p-2 rounded-md min-w-[300px] mt-5 w-[100%] h-[30px]"
          type="search"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border border-gray-300 mt-8 rounded-md">
        <div className="border-b border-gray-300 h-[45px] p-[8px] text-[20px] font-bold">
          All Pastes
        </div>
        <div className="flex flex-col gap-5 m-5">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div
                  className="border border-gray-300 rounded-md flex flex-row justify-between gap-5 p-3"
                  key={paste?._id}>
                  <div className="text-[9px] flex flex-col">
                    <div className="text-[20px] font-bold">{paste.title}</div>
                    <div className="truncate w-full max-w-[150px]">
                      {paste.content}
                    </div>
                  </div>
                  <div className="relative group sm:hidden">
                    <HiDotsVertical className="cursor-pointer" />

                    {/* Dropdown on hover */}
                    <div
                      className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 z-10">
                      <Link
                        to={`/?pasteId=${paste?._id}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm">
                        Edit
                      </Link>
                      <Link
                        to={`/pastes/${paste?._id}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm">
                        View
                      </Link>
                      <div
                        onClick={() => handleDelete(paste?._id)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm">
                        Delete
                      </div>
                      <div
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to clipboard");
                        }}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm">
                        Copy
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-row gap-3 h-7">
                        <Link
                          to={`/?pasteId=${paste?._id}`}
                          className="border border-gray-300 rounded-sm p-1 flex items-center justify-center text-lg leading-none">
                          <CiEdit />
                        </Link>

                        <Link
                          to={`/pastes/${paste?._id}`}
                          className="border border-gray-300 rounded-sm p-1 flex items-center justify-center text-lg leading-none">
                          <IoEyeOutline />
                        </Link>

                        <div
                          onClick={() => handleDelete(paste?._id)}
                          className="cursor-pointer border border-gray-300 rounded-sm p-1 flex items-center justify-center text-lg leading-none">
                          <RiDeleteBin5Line />
                        </div>

                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(paste?.content);
                            toast.success("copied to clipboard");
                          }}
                          className="cursor-pointer border border-gray-300 rounded-sm p-1 flex items-center justify-center text-lg leading-none">
                          <MdContentCopy />
                        </div>

                        <div
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
                            navigator.clipboard.writeText(shareUrl);
                            toast.success("Link copied to clipboard!");
                          }}
                          className="cursor-pointer border border-gray-300 rounded-sm p-1 flex items-center justify-center text-lg leading-none">
                          <CiShare1 />
                        </div>
                      </div>

                      <div>{FormatDate(paste?.createAt)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Paste;
