import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";
import analyzing from "../Analyzing.gif";
import extracting from "../Extracting.gif";
// import success from "../Success.gif"

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [text, setText] = useState({});
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [processText, setProcessText] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  // const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [analyzing, extracting];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    getBase64(file)
      .then((base64) => {
        file["base64"] = base64;
        console.log("File Is", file);
        setSelectedFile(base64);
        setSelectedFileName(file["name"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFile = () => {
    setIsLoading(false);
    setSelectedFile(null);
    document.getElementById("dropzone-file").value = null;
    setText(null);
  };

  const options = {
    method: "POST",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    data: {
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      temperature: 0,
      // stream: true
      // prompt: 'Extractkeywordsthatmakesensefromthistext.Makethefirstletterofeverykeyworduppercaseandseparatewithcommas: \n\n',
      // temperature: 0.5,
      // max_tokens: 60,
      // top_p: 1,
      // frequency_penalty: 0.8,
      // presence_penalty: 0,
    },
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      // let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Converting image to base64", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      // console.log(fileInfo);
    });
  };

  const convertToText = () => {
    setText(null);
    setProcessText(false);
    setIsLoading(true);
    setKeywords(null);
    var schema = {
      domain: "type - string, identify the domain of the document",
      summary: "type - string, Summarize necessary details in the document",
      patient_details: {
        type: "array of objects",
        description:
          "Patient's personal details each returned as an object containing 'title' and 'value' strings",
        properties: {
          title: "string",
          value: "string",
        },
      },
      care_details: {
        type: "array of objects",
        description:
          "Doctor, Hospital details each returned as an object containing 'title' and 'value' strings",
        properties: {
          title: "string",
          value: "string",
        },
      },
      medical_details: {
        type: "array of objects",
        description:
          "Patient's medical details (vitals, medicines, chief complaints, diagnosis, advice, follow up date etc) each returned as an object containing 'title' and 'value' strings. In case of multiple values, use comma as a delimiter in the value field",
        properties: {
          title: "string",
          value: "string",
        },
      },
    };

    options["data"]["messages"] = [
      {
        role: "system",
        content: [
          {
            type: "text",
            // "text": "Extract keywords and provide details for each keyword under the heading 'Summary'. Also, identify the domain of the document and return with the heading 'Domain' in the starting of the response. If the domain is anything related to medical or healthcare etc return 'Healthcare'"
            // "text": "Extract keywords and provide details for each keyword. Also, identify the domain of the document. Your output should be like this: {'Domain': 'Healthcare', 'Summary': 'string summary'}}, 'Keywords': 'All Keywords and details as string not nested json."
            text: `As an expert medical analyst, specialised in extracting information from images and generating medical summary, extract all details in json format that follow this schema: ${JSON.stringify(
              schema
            )} from the image provided. Ensure that the output includes accurate details and follows the given structure.`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: selectedFile,
            },
          },
        ],
      },
    ];
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        let text = response?.data?.choices?.[0]?.message?.content;
        setIsLoading(false);
        console.log({ text });
        console.log(JSON.parse(text));
        // // split ``` and json if there
        // if (text.split("```").length > 1){
        //   text = text.split('```')[1].replace("json", '')
        // }
        // console.log({text})
        // console.log(text.trim())
        setText(JSON.parse(text));
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        setIsLoading(false);
        alert(error?.response?.data?.error?.message);
      });
    // Tesseract.recognize(selectedFile, "eng", {
    //   logger: (m) => console.log("Loading", m),
    // })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .then((result) => {
    //     // Get Confidence score
    //     setIsLoading(false);
    //     let confidence = result?.data?.confidence;
    //     setConfidence(confidence);
    //     console.log(result?.data?.confidence, confidence);

    //     let text = result?.data?.text;
    //     setText(text);
    //   });
  };

  useEffect(() => {
    setText(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  function normalizeKeys(data) {
    // Helper function to normalize a single object
    const normalizeObject = (obj) => {
      const normalizedObject = {};
      Object.keys(obj).forEach((key) => {
        const normalizedKey = key
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/^_+|_+$/g, ""); // Replace spaces and remove leading/trailing underscores
        normalizedObject[normalizedKey] = obj[key];
      });
      return normalizedObject;
    };

    // Check if data is an array or single object
    if (Array.isArray(data)) {
      // Normalize keys for array of objects
      return data.map((item) => normalizeObject(item));
    } else if (typeof data === "object") {
      // Normalize keys for single object
      return normalizeObject(data);
    } else {
      // Handle other types or throw an error
      throw new Error("Invalid data type. Expected array or object.");
    }
  }

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:bg-white-700 hover:bg-white-100 dark:border-white-600 dark:hover:border-white-500 dark:hover:bg-white-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            {/* <p
              id="selectedFileName"
              className={text-xs text-gray-500 dark:text-gray-400 ${selectedFile ? '' : 'hidden'}}
            >
              {selectedFileName}
            </p> */}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {selectedFile && (
        <div className="flex flex-col mt-2 items-center">
          <span className="text-sm text-gray-600">
            {selectedFileName}
            <button
              type="button"
              className="ml-2 text-red-600"
              onClick={removeFile}
            >
              &times;
            </button>
          </span>
          {(fileType === "image/jpeg" ||
            fileType === "image/webp" ||
            fileType === "image/png") && (
            <img
              src={selectedFile}
              width="20%"
              height="10%"
              // className="hover:scale-150"
              alt="Selected document"
            />
          )}

          {fileType === "application/pdf" && (
            <object width="100%" height="250" data={selectedFile}>
              <p>Selected Document</p>
            </object>
          )}

          <div>
            <button
              onClick={convertToText}
              className="m-4 text-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Convert to text
            </button>
            <button
              onClick={removeFile}
              className="m-4 text-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div>
          <img
            src={images[currentImageIndex]}
            alt={`${currentImageIndex + 1}`}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        // <div role="status">
        //   <svg
        //     aria-hidden="true"
        //     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        //     viewBox="0 0 100 101"
        //     fill="none"
        //     xmlns="http://www.w3.org/2000/svg"
        //   >
        //     <path
        //       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        //       fill="currentColor"
        //     />
        //     <path
        //       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        //       fill="currentFill"
        //     />
        //   </svg>
        //   <span className="sr-only">Loading...</span>
        // </div>
      )}

      {text && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg w-full">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Output:</h2>
          <div className="border-t border-gray-300 pt-2 mt-4">
            <h3 className="text-base font-medium text-gray-700 mb-2">
              Domain:
            </h3>
            <p className="text-sm text-gray-600">{text?.domain}</p>
          </div>
          <div className="border-t border-gray-300 pt-2">
            {normalizeKeys(text).patient_details && (
              <div>
                <h3 className="text-base font-medium text-gray-700">
                  Patient details:
                </h3>
                <ul className="list-disc pl-6">
                  {normalizeKeys(text.patient_details).map((detail, index) => {
                    const { title, value } = detail;
                    if (value && title) {
                      return (
                        <li key={index} className="text-sm text-gray-600">
                          <strong>{title}</strong>: {value}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>{" "}
              </div>
            )}

            {normalizeKeys(text).care_details && (
              <div>
                <h3 className="text-base font-medium text-gray-700 mt-2">
                  Care details:
                </h3>
                <ul className="list-disc pl-6">
                  {normalizeKeys(text.care_details).map((detail, index) => {
                    const { title, value } = detail;
                    if (value && title) {
                      return (
                        <li key={index} className="text-sm text-gray-600">
                          <strong>{title}</strong>: {value}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>{" "}
              </div>
            )}
            {normalizeKeys(text).medical_details && (
              <div>
                <h3 className="text-base font-medium text-gray-700 mt-2">
                  Medical details:
                </h3>
                <ul className="list-disc pl-6">
                  {normalizeKeys(text.medical_details).map((detail, index) => {
                    const { title, value } = detail;
                    if (value && title) {
                      return (
                        <li key={index} className="text-sm text-gray-600">
                          <strong>{title}</strong>: {value}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>{" "}
              </div>
            )}
          </div>
          <div className="border-t border-gray-300 pt-2 mt-4">
            <h3 className="text-base font-medium text-gray-700 mb-2">
              Summary:
            </h3>
            <p className="text-sm text-gray-600">{text?.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
