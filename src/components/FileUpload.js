import React from "react";

const FileUpload = ({ onFileChange }) => {
  return (
    <div className="flex flex-col items-center p-8">
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:bg-white-700 hover:bg-white-100 dark:border-white-600 dark:hover:border-white-500 dark:hover:bg-white-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p
              id="selectedFileName"
              class="hidden text-xs text-gray-500 dark:text-gray-400"
            ></p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            onchange="updateFileName(this)"
          />
        </label>
      </div>

      <button
        type="button"
        className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
      >
        Generate output
      </button>
      <div className="mt-6 bg-gray-100 p-4 rounded-lg w-full">
        <h2 className="text-lg font-medium text-gray-800 mb-2">Output:</h2>
        <div className="border-t border-gray-300 pt-2">
          <h3 className="text-base font-medium text-gray-700 mb-2">
            Highlighted Keywords:
          </h3>
          <ul className="list-disc pl-6">
            <li className="text-sm text-gray-600">Keyword 1</li>
            <li className="text-sm text-gray-600">Keyword 2</li>
            {/* Add more list items dynamically based on the keywords */}
          </ul>
        </div>
        <div className="border-t border-gray-300 pt-2 mt-4">
          <h3 className="text-base font-medium text-gray-700 mb-2">Domain:</h3>
          <p className="text-sm text-gray-600">Healthcare</p>
        </div>
        <div className="border-t border-gray-300 pt-2 mt-4">
          <h3 className="text-base font-medium text-gray-700 mb-2">Summary:</h3>
          <p className="text-sm text-gray-600">Summary text goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
