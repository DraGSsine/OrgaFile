import React from "react";
import Link from "next/link";
import { InstagramIcon, Linkedin01Icon, TwitterIcon } from "hugeicons-react";
const FooterBar = () => {
  return (
    <footer className="py-14 border-t border-slate-100">
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="flex justify-between">
          <div>
            <Link href="/" className="text-lg flex items-center">
              <span className="font-bold text-indigo-600">Orga</span>
              <span className="text-slate-600">File</span>
            </Link>
            <p className="mt-4 text-sm text-slate-700 max-w-xs"></p>
            <div className="flex gap-3 mt-4 items-center">
              <Link
                href="https://twitter.com/yassineouchen"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
              >
                <TwitterIcon size={16} />
                <span className="sr-only">Twitter or X</span>
              </Link>
              <Link
                href="https://instagram.com/yassin.ouchn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
              >
                <InstagramIcon size={16} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/yassineouchen/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
              >
                <Linkedin01Icon size={16} />
                <span className="sr-only">Linkedin</span>
              </Link>
            </div>
          </div>
          <div className="flex  gap-32">
            <div>
              <h3 className="font-medium text-sm text-slate-800">Company</h3>
              <div className="flex flex-col mt-3">
                <Link
                  href="/about"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  About
                </Link>
                <Link
                  href="/legal"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  legal
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-slate-800">Legal</h3>
              <div className="flex flex-col mt-3">
                <Link
                  href="/legal"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  legal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 pt-8 px-5 border-t border-slate-200">
        <div className="max-w-screen-xl mx-auto px-5">
          <p className="text-center text-sm text-slate-600 [text-wrap:balance]">
            Copyright © 2024 OrgaFile. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
