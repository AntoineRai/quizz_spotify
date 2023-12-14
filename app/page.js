"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Popup from "../components/Popup";
import Header from "../components/Header";
const Home = () => {
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    let user_data = localStorage.getItem("user_data");
    if (user_data === null || user_data.name === "") {
      setButtonPopup(true);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center h-screen gap-4">
        <Link href="/thematique">
          <button className="bg-blue-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72">
            SOLO
          </button>
        </Link>
        <Link href="/multijoueur">
          <button className="bg-red-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72">
            MULTIJOUEUR
          </button>
        </Link>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p>Rentrez votre nom :</p>
      </Popup>
    </div>
  );
};

export default Home;
