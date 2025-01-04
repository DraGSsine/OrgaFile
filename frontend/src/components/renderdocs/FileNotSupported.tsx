import { FileRemoveIcon } from "hugeicons-react";

export const FileNotSupported = ({ onClose }:{onClose:any}) => {
  const supportedFormats = ["pdf", "doc", "docx", "txt"];
    return (
      <section className="bg-white h-full dark:bg-gray-900">
        <div className="container flex items-center min-h-full px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-4 text-sm font-medium text-orange-400 rounded-full bg-orange-50 dark:bg-gray-800">
              <FileRemoveIcon size={40} />
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              File not supported
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              The viewer only supports <span className="font-medium text-orange-400">{
                supportedFormats.join(", ")
              }</span> files for now. Please try another file.
            </p>
  
            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button 
                onClick={onClose} 
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              >
                Close
              </button>
  
              <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-primary-color rounded-lg shrink-0 sm:w-auto hover:bg-primary-color dark:hover:bg-primary-color dark:bg-primary-color">
                Report
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };