import { Mail01Icon, Shield01Icon } from "hugeicons-react";
import React from "react";
import Link from "next/link";
const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <header className="text-center mb-12">
            <Link className="text-4xl font-bold text-gray-900 mb-2" href="/">OrgaFile</Link>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield01Icon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl text-gray-600">
                Privacy Policy & Terms of Service
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-indigo max-w-none">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Service Overview
              </h2>
              <p className="text-gray-600">
                OrgaFile is an AI-powered file organization service that
                processes your uploaded files using Mistral AI, automatically
                categorizes and renames files based on content, and organizes
                them into logical folder structures.
              </p>
            </section>

            {/* Data Collection */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    2.1 Personal Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Name and email address</li>
                    <li>Payment and billing information</li>
                    <li>Account credentials</li>
                    <li>Usage statistics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    2.2 File Data
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Uploaded files and their metadata</li>
                    <li>AI-generated analysis results</li>
                    <li>File organization structures</li>
                    <li>Processing history</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Service Terms
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    3.1 Usage Guidelines
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Do not upload malicious files or malware</li>
                    <li>Do not upload illegally obtained content</li>
                    <li>Do not attempt to manipulate the AI system</li>
                    <li>Do not exceed storage quotas</li>
                    <li>Do not share account credentials</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    3.2 File Limitations
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Maximum file size: 100MB per file</li>
                    <li>Monthly storage quota: 10GB</li>
                    <li>Processing time varies by file size and type</li>
                    <li>
                      Some file types may have limited analysis capabilities
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Rights & Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Your Rights & Responsibilities
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    4.1 Your Rights
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Access and delete your files at any time</li>
                    <li>Export your data and files</li>
                    <li>Cancel your subscription</li>
                    <li>Request support assistance</li>
                    <li>Retain full ownership of your files</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    4.2 Your Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Maintain account security</li>
                    <li>Keep subscription active for service access</li>
                    <li>Comply with usage guidelines</li>
                    <li>Respect storage limitations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Security & Privacy
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We implement industry-standard security measures to protect
                  your data:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>End-to-end encryption for file transmission</li>
                  <li>Secure storage with encryption at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Restricted access to storage systems</li>
                  <li>Automated backup systems</li>
                </ul>
              </div>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Changes & Termination
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">We reserve the right to:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Modify service features with notice</li>
                  <li>Update the AI processing system</li>
                  <li>Adjust pricing with advance notice</li>
                  <li>Terminate accounts for violations</li>
                  <li>Modify these terms with user notification</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">

            <div className="flex items-center justify-center mt-4 text-gray-600">
              <Mail01Icon className="w-5 h-5 mr-2" />
              <a
                href="mailto:support@orgafile.com"
                className="hover:text-indigo-600"
              >
                support@orgafile.com
              </a>
            </div>
            <p className="text-center mt-4 text-sm text-gray-500">
              By using OrgaFile, you agree to these terms and privacy policy.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Page;
