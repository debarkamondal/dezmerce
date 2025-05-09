import Image from "next/image";

const About = async () => {
  return (
    <>
      <div className="ml-6 flex items-center justify-around gap-2 text-center md:relative md:ml-16 xl:ml-32">
        <h1 className="font-alex-brush text-secondary absolute -left-6 rotate-270 text-left text-5xl font-semibold mix-blend-difference md:-left-36 md:text-9xl">
          About
        </h1>
        <Image
          src="/about-1.jpg"
          height={900}
          width={300}
          alt="about-img-1"
          className="w-1/2 rounded-md xl:w-1/3"
        />
        <div className="grow">
          <span className="font-alex-brush text-4xl font-semibold md:mt-16 md:text-8xl">
            Priceless
          </span>
          <p className="font-alex-brush text-2xl font-semibold md:text-4xl">
            &
          </p>
          <span className="font-alex-brush text-4xl font-semibold md:text-8xl">
            Affordable
          </span>
        </div>
      </div>
      <p className="p-4 text-center md:p-16 md:text-lg">
        <span className="text-xl font-bold md:text-4xl">I</span>n the era of
        brands running after profits we are a brand earning happiness. We are a
        group of people doing what we love, starting from the farmers who grow
        fibers out of dirt to the person putting final seal on the finished
        product.
      </p>
      <h2 className="font-alex-brush text-center text-3xl font-semibold md:mb-16 md:text-5xl">
        Our Motto
      </h2>
      <div className="m-4 space-y-8 md:text-lg">
        <div className="flex items-center justify-around gap-4">
          <div>
            <h2 className="border-primary my-2 border-l-4 px-2 text-lg font-semibold">
              Fabric
            </h2>
            <p>
              We weave fabric with{" "}
              <span className="font-alex-brush text-3xl md:text-4xl">love</span>{" "}
              and cotton.
            </p>
            <p> We only use nature&apos;s cotton.</p>
          </div>
          <Image
            src="/about-2.jpg"
            height={500}
            width={500}
            alt="fabric"
            className="w-1/2 rounded-md grayscale xl:w-1/3"
          />
        </div>
        <div className="flex items-center justify-around gap-4">
          <Image
            src="/about-3.jpg"
            height={500}
            width={500}
            alt="fabric"
            className="w-1/2 rounded-md grayscale xl:w-1/3"
          />
          <div>
            <h2 className="border-primary my-2 border-l-4 px-2 text-lg font-semibold">
              Fashion
            </h2>
            <p>
              Your clothes are our{" "}
              <span className="font-alex-brush text-3xl md:text-4xl">
                canvas
              </span>
              .
            </p>
            <p>Each design is a masterpiece.</p>
          </div>
        </div>
        <div className="flex items-center justify-around gap-4">
          <div>
            <h2 className="border-primary my-2 border-l-4 px-2 text-lg font-semibold">
              Fit
            </h2>
            <p>
              As{" "}
              <span className="font-alex-brush text-3xl md:text-4xl">
                comfortable
              </span>{" "}
              as mother&apos;s lap.
            </p>
            <p>Enough to make you fall asleep.</p>
          </div>
          <Image
            src="/about-4.jpg"
            height={500}
            width={500}
            alt="fabric"
            className="w-1/2 rounded-md grayscale xl:w-1/3"
          />
        </div>
      </div>
    </>
  );
};

export default About;
