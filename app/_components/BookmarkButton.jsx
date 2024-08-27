"use client";

import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import bookmarkProperty from "@/app/_actions/bookmarkPropert";
import checkBookmarkStatus from "@/app/_actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "@/app/_components/Spinner";

const BookmarkButton = ({ property }) => {


  const { data: session } = useSession();
  const userId = session?.user?.id;
  

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark properties");
      return;
    }
    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };


 if(loading) {
  return <Spinner />
 }
  return isBookmarked ? (
    <button
      className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-600"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
