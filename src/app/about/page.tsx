import Image from "next/image"

const About = async () => {
    return (
        <div className="grow p-2 md:px-8 xl:px-40">
            <div className="md:relative text-center flex gap-2 items-center justify-around ml-6 md:ml-16 xl:ml-32 ">
                <h1 className="font-alex-brush text-5xl md:text-9xl font-semibold mix-blend-difference absolute -left-6 md:-left-36 rotate-270 text-secondary text-left">About</h1>
                <Image src="/about-1.jpg" height={900} width={300} alt="about-img-1" className="w-1/2 xl:w-1/3 rounded-md" />
                <div className="grow">
                    <span className="font-alex-brush text-4xl md:text-8xl md:mt-16 font-semibold">Priceless</span>
                    <p className="font-alex-brush text-2xl  md:text-4xl font-semibold">&</p>
                    <span className="font-alex-brush text-4xl md:text-8xl font-semibold">Affordable</span>
                </div>
            </div>
            <p className="p-4 md:p-16 text-center md:text-lg">
                <span className="text-xl md:text-4xl font-bold">I</span>n the era of brands running after profits we are a brand earning happiness. We are a group of people doing what we love, starting from the farmers who grow fibers out of dirt to the person putting final seal on the finished product.
            </p>
            <h2 className="text-3xl md:text-5xl font-alex-brush font-semibold text-center md:mb-16">Our Motto</h2>
            <div className="m-4 space-y-8 md:text-lg">
                <div className="flex gap-4 items-center justify-around">
                    <div>
                        <h2 className="font-semibold text-lg border-l-4 px-2 my-2 border-primary">Fabric</h2>
                        <p>We weave fabric with <span className="font-alex-brush text-3xl md:text-4xl">love</span> and cotton.</p>
                        <p>  We only use nature&apos;s cotton.</p>
                    </div>
                    <Image src="/about-2.jpg" height={500} width={500} alt="fabric" className="rounded-md w-1/2 xl:w-1/3 grayscale" />
                </div>
                <div className="flex gap-4 items-center justify-around">
                    <Image src="/about-3.jpg" height={500} width={500} alt="fabric" className="rounded-md w-1/2 xl:w-1/3 grayscale" />
                    <div>
                        <h2 className="font-semibold text-lg border-l-4 px-2 my-2 border-primary">Fashion</h2>
                        <p>Your clothes are our <span className="font-alex-brush text-3xl md:text-4xl">canvas</span>.</p>
                        <p>Each design is a masterpiece.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-around">
                    <div>
                        <h2 className="font-semibold text-lg border-l-4 px-2 my-2 border-primary">Fit</h2>
                        <p>As <span className="font-alex-brush text-3xl md:text-4xl">comfortable</span> as mother&apos;s lap.</p>
                        <p>Enough to make you fall asleep.</p>
                    </div>
                    <Image src="/about-4.jpg" height={500} width={500} alt="fabric" className="rounded-md w-1/2 xl:w-1/3 grayscale" />
                </div>
            </div>
        </div>
    )
}

export default About
