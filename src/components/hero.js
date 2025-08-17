import React from 'react';

const Hero = () => {
  return (
    <section className="h-screen">
      <div className="flex flex-col justify-start items-center px-8 py-12 mx-auto max-w-7xl lg:px-16 md:px-12 lg:py-24">
        <div className="max-w-xl mx-auto mt-auto text-center">
          <p className="mt-8 text-5xl font-medium tracking-tighter text-black">
            Wealth Lifestyles Popculture
          </p>
          <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight text-gray-600">
            To empower people with the financial knowledge they need to live their best lives.
            We provide education, resources, and inspiration to help you reach your financial goals.
            From budgeting to investing, we have something for everyone.
            So come join us on our journey to financial freedom!
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <a className="p-1 -m-1 group" aria-label="Follow on Twitter" href="#">
          <ion-icon className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated" name="logo-twitter" role="img" aria-label="logo twitter"></ion-icon>
        </a>
        <a className="p-1 -m-1 group" aria-label="Follow on Instagram" href="#">
          <ion-icon className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated" name="logo-instagram" role="img" aria-label="logo instagram"></ion-icon>
        </a>
        <a className="p-1 -m-1 group" aria-label="Follow on GitHub" href="#">
          <ion-icon className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated" name="logo-github" role="img" aria-label="logo github"></ion-icon>
        </a>
        <a className="p-1 -m-1 group" aria-label="Follow on LinkedIn" href="#">
          <ion-icon className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated" name="logo-linkedin" role="img" aria-label="logo linkedin"></ion-icon>
        </a>
      </div>
    </section>
  );
};

export default Hero;
