import React from "react";

const ProfileMetrics = () => {
  const metrics = [
    {
      key: "Posts",
      value: 41,
    },
    {
      key: "Level",
      value: 9,
    },
    {
      key: "Followers",
      value: 819,
    },
    {
      key: "Following",
      value: 21,
    },
  ];

  return (
    <>
      <main>
        <section className="py-6">
          <article className="items-center justify-center hidden mb-2 space-x-2 md:flex md:mb-6">
            <span className="text-lg font-semibold tracking-wide text-gray-700 md:font-normal md:text-2xl">
              saket.gokhale
            </span>
            <span className="py-3 text-sm font-semibold text-white rounded-lg px-7 bg-brandBlue">
              Follow
            </span>
          </article>
          <article className="flex flex-wrap justify-center w-full">
            {metrics.map((data) => {
              return (
                <div className="text-sm text-center w-[90px] h-14">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {data.value}
                  </h2>
                  <h3>{data.key}</h3>
                </div>
              );
            })}
          </article>
        </section>
      </main>
    </>
  );
};

export default ProfileMetrics;
