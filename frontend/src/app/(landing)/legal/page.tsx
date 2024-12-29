import {
  Alert01Icon,
  ArrowRight01Icon,
  File01Icon,
  HeartCheckIcon,
  JusticeScale01Icon,
  LockIcon,
  Mail01Icon,
  Message01Icon,
  Shield01Icon,
  UserCheck01Icon,
} from "hugeicons-react";
import React from "react";

const Page = () => {
  const navItems = [
    {
      icon: <LockIcon className="w-5 h-5" />,
      title: "Privacy & Security",
      section: "#privacy",
    },
    {
      icon: <JusticeScale01Icon className="w-5 h-5" />,
      title: "Terms of Service",
      section: "#terms",
    },
    {
      icon: <UserCheck01Icon className="w-5 h-5" />,
      title: "Your Rights",
      section: "#rights",
    },
    {
      icon: <Alert01Icon className="w-5 h-5" />,
      title: "Guidelines",
      section: "#guidelines",
    },
  ];

  const securityMeasures = [
    {
      title: "Data Encryption",
      desc: "End-to-end encryption for all file transfers and storage",
    },
    {
      title: "Access Control",
      desc: "Strict authentication and authorization protocols",
    },
    {
      title: "Regular Audits",
      desc: "Continuous security monitoring and vulnerability assessments",
    },
    {
      title: "Compliance",
      desc: "Adherence to international data protection standards",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield01Icon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Privacy Policy & Terms of Service
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          {/* Quick Navigation */}
          <nav className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.section}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-indigo-600">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <ArrowRight01Icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </a>
            ))}
          </nav>

          <div className="prose prose-indigo max-w-none">
            {/* Service Overview */}
            <section
              id="overview"
              className="mb-12 p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <File01Icon className="w-6 h-6 mr-2 text-indigo-600" />
                Service Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                OrgaFile is an advanced AI-powered file organization service
                that leverages cutting-edge technology to transform how you
                manage your digital content. Our platform intelligently
                processes your files using state-of-the-art AI, automatically
                categorizing and renaming them based on content analysis, while
                creating intuitive folder structures that make sense for your
                workflow.
              </p>
            </section>

            {/* Privacy & Security */}
            <section id="privacy" className="mb-12">
              <div className="border-l-4 border-indigo-600 pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Information We Collect
                </h2>
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Personal Information
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Profile details including name and contact information",
                        "Account credentials and authentication data",
                        "Payment and subscription information",
                        "Usage patterns and interaction statistics",
                        "Communication preferences and settings",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-2 h-2 mt-2 mr-3 bg-indigo-600 rounded-full"></span>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Measures */}
            <section id="security" className="mb-12 bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <LockIcon className="w-6 h-6 mr-2 text-indigo-600" />
                Security Measures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityMeasures.map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-12 bg-gradient-to-br from-rose-50 to-indigo-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HeartCheckIcon className="w-6 h-6 mr-2 text-rose-500" />
                Friendly Dispute Resolution
              </h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  At OrgaFile, we believe in maintaining positive relationships
                  with our customers. We understand that disagreements may
                  arise, and we're committed to resolving them in a friendly,
                  professional, and efficient manner.
                </p>
                <div className="bg-white/50 rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Our Promise to You
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Message01Icon className="w-5 h-5 mr-3 text-indigo-600 mt-1" />
                      <span className="text-gray-700">
                        Open and transparent communication at all times
                      </span>
                    </li>
                    <li className="flex items-start">
                      <HeartCheckIcon className="w-5 h-5 mr-3 text-indigo-600 mt-1" />
                      <span className="text-gray-700">
                        Friendly and understanding approach to problem-solving
                      </span>
                    </li>
                    <li className="flex items-start">
                      <LockIcon className="w-5 h-5 mr-3 text-indigo-600 mt-1" />
                      <span className="text-gray-700">
                        Fair and unbiased consideration of all concerns
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  If you experience any issues or have concerns, our support
                  team is here to help. We'll work together to find a solution
                  that makes everyone happy, without any legal complications or
                  formal proceedings.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                  <Mail01Icon className="w-5 h-5 mr-2" />
                  <a href="mailto:support@orgafile.com">support@orgafile.com</a>
                </div>
                <p className="text-center text-sm text-gray-500">
                  By using OrgaFile, you agree to these terms and privacy
                  policy.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;