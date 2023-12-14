"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import HomeArrow from "../../components/HomeArrow";

const Multi = () => {

  return (
    <div>
        <div className="flex items-center justify-center h-screen gap-4">
            <Link href="/">
                <button className="bg-blue-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72">
                    HEBERGER
                </button>
            </Link>
            <Link href="/">
                <button className="bg-red-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72">
                    REJOINDRE
                </button>
            </Link>
            </div>
        <HomeArrow />
    </div>
    
  );
};

export default Multi;
