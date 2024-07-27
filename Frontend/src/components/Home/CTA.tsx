export function CTA() {
  return (
    <section className="py-10 mt-20 mb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full text-center md:max-w-2xl">
          {/* <h2 className="text-3xl font-inter font-extrabold tracking-wider text-white  ">
            Get full access to Platform
          </h2> */}
          <p className="mx-auto mt-4 text-lg  font-urbanist leading-relaxed text-white">
            <span className="text-violet-400 text-3xl font-extrabold ">
              Welcome to the future of gaming!
            </span>
            <br /> Dive into a world where you can purchase games as NFTs,
            ensuring true ownership and unique in-game experiences.
            <br /> Join us in revolutionizing how we play and own games.
          </p>
        </div>
        <form action="#" method="POST" className="mx-auto mt-12 max-w-xl">
          <div className="flex flex-col items-center sm:flex-row sm:justify-center">
            <div className="flex w-full max-w-sm items-center justify-center space-x-2"></div>
          </div>
        </form>
        <div className="mt-8 flex items-center justify-center px-8 sm:px-0">
          <span className="ml-2 text-sm text-white font-inter">
            Begin your{" "}
            <span className="text-violet-400 font-extrabold ">Journey </span>
            with us today
          </span>
        </div>
      </div>
    </section>
  );
}
