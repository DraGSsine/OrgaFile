import React from 'react'

const Page = () => {
  return (
    <div className="bg-gray-100 text-gray-800 grid content-center h-screen">
    <div className="max-w-4xl mx-auto  bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Legal Documents</h1>

      {/* Terms of Use */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Terms of Use</h2>
        <p className="mb-2">
          By accessing and using our service ("OrgaFile"), you accept and
          agree to be bound by the terms and provisions of this agreement. You
          are responsible for your use of the service, for any content you upload, and
          for any consequences thereof.
        </p>
      </section>

      {/* Privacy Policy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
        <p className="mb-2">
          We respect your privacy. We do not collect, use, or share your personal
          data beyond what is necessary to provide our service. The files you upload
          are processed to extract topics and are not stored or analyzed by us.
        </p>
        <a href="/privacy-policy" className="text-blue-500 hover:underline">
          Read more
        </a>
      </section>

      {/* Disclaimer */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
        <p className="mb-2">
          The information provided on this website is for general informational purposes only.
          We do not guarantee the accuracy or completeness of the information derived from
          your files.
        </p>
        <a href="/disclaimer" className="text-blue-500 hover:underline">
          Read more
        </a>
      </section>

      {/* Refund and Cancellation Policy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Refund and Cancellation Policy</h2>
        <p className="mb-2">
          Our Refund and Cancellation Policy outlines the terms under which you can request
          a refund. Please refer to our payment provider, Stripe, for more details.
        </p>
        <a href="/refund-policy" className="text-blue-500 hover:underline">
          Read more
        </a>
      </section>

      {/* Acceptable Use Policy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Acceptable Use Policy</h2>
        <p className="mb-2">
          Our Acceptable Use Policy outlines the acceptable and prohibited behaviors on our
          website. Users must not upload any illegal or harmful content.
        </p>
        <a href="/aup" className="text-blue-500 hover:underline">
          Read more
        </a>
      </section>

      {/* End User License Agreement */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">End User License Agreement</h2>
        <p className="mb-2">
          Our End User License Agreement (EULA) outlines the terms under which you can use
          our software. By using our service, you agree to comply with these terms.
        </p>
        <a href="/eula" className="text-blue-500 hover:underline">
          Read more
        </a>
      </section>
    </div>
  </div>
  )
}

export default Page