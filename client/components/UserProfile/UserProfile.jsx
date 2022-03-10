import React from "react";
import { ProfileMetrics, ProfileBio } from "./index.js";
import { BsChevronLeft } from "react-icons/bs";

const UserProfile = () => {
  return (
    <>
      <main>
        <section className="flex flex-col w-full px-4 py-8 md:px-12 justify-evenly lg:flex-row">
          <article className="flex flex-col items-start w-full md:hidden">
            <div className="flex items-center justify-center w-full mb-2 space-x-2 md:mb-6">
              <div className="flex items-center space-x-1 w-[65%]">
                <span className="p-1 mt-1 text-lg border rounded-full">
                  <BsChevronLeft />
                </span>
                <span className="text-lg tracking-wide text-gray-700 md:font-normal md:text-2xl">
                  saket.gokhale
                </span>
              </div>
              <span className="w-[35%] text-center py-2 text-xs font-semibold text-white rounded-lg bg-brandBlue">
                Follow
              </span>
            </div>
          </article>
          <article className="flex flex-row items-center w-full mb-8 justify-evenly lg:flex-col">
            <div className="w-[45%] md:w-[35%] flex justify-center">
              <img
                className="w-[75%] rounded-full"
                src="saketprofile1.png"
                alt="Profile Image"
              />
            </div>
            <div className="w-[55%] md:w-[60%]  md:h-40">
              <ProfileMetrics />
            </div>
          </article>
          <article className="flex flex-col justify-center">
            <div className="w-full h-56 mb-8 bg-gray-200">
              <ProfileBio />
            </div>
            <div className="flex w-full justify-evenly">
              <div className="w-[48%] h-56 bg-gray-200"></div>
              <div className="w-[48%] h-56 bg-gray-200"></div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
