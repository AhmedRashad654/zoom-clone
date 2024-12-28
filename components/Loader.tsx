import Image from "next/image";
import React from "react";
import loader from "../public/icons/loading-circle.svg";
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <Image src={loader} alt="loader" width={30} height={30} />
    </div>
  );
};

export default Loader;
