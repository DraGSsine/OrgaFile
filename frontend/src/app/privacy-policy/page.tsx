import React from "react";

const page = () => {
  return (
    <div>
      <div className="relative -mt-[5.75rem] overflow-hidden pt-[5.75rem]">
        <img
          src="/plus/img/beams-basic.png"
          alt=""
          className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none"
        />
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-24">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Privacy policy
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Last updated on November 2, 2021
            </p>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[40rem] prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
            <h2 className=" text-2xl font-semibold mt-10 mb-5   ">Information transfer and storage</h2>
            <p>
              Depending on your location, data transfers may involve
              transferring and storing your information in a country other than
              your own. You are entitled to learn about the legal basis of
              information transfers to a country outside the European Union or
              to any international organization governed by public international
              law or set up by two or more countries, such as the UN, and about
              the security measures taken by us to safeguard your information.
              If any such transfer takes place, you can find out more by
              checking the relevant sections of this document or inquire with us
              using the information provided in the Contact section.
            </p>
            <h2 className=" text-2xl font-semibold mt-10 mb-5   ">The right to object to processing</h2>
            <p>
              Where Personal Information is processed for a public interest, in
              the exercise of an official authority vested in us or for the
              purposes of the legitimate interests pursued by us, you may object
              to such processing by providing a ground related to your
              particular situation to justify the objection. You must know that,
              however, should your Personal Information be processed for direct
              marketing purposes, you can object to that processing at any time
              without providing any justification. To learn whether we are
              processing Personal Information for direct marketing purposes, you
              may refer to the relevant sections of this document.
            </p>
            <h2 className=" text-2xl font-semibold mt-10 mb-5   ">How to exercise these rights</h2>
            <p>
              Any requests to exercise User rights can be directed to the Owner
              by email at{" "}
              <a href="mailto:support@tailwindui.com">support@tailwindui.com</a>
              . These requests can be exercised free of charge and will be
              addressed by the Owner as early as possible and always within one
              month.
            </p>
            <h2 className=" text-2xl font-semibold mt-10 mb-5   ">Contacting us</h2>
            <p>
              If you have any questions about this Policy, please contact us by
              email at{" "}
              <a href="mailto:support@tailwindui.com">support@tailwindui.com</a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
