import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomeArrow = () => {
  return (
    <div>
      <div className="fixed bottom-0 left-0 m-4">
        <Link href="/">
          <button className="bg-red-500 text-white font-bold p-4 rounded-full border-white border-4  flex items-center justify-center">
            <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeArrow;
