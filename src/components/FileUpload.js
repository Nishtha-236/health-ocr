import React from 'react';

const FileUpload = ({ onFileChange }) => {
  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => onFileChange(e.target.files[0])} />
      <p>Upload an image containing text.</p>
      {/* <button onClick={onClick}> */}
      <button>
      Summarize
      </button>

      <div>
      <h2>Extracted Text:</h2>
      <pre>Some text</pre>
      {/* {keywords.length > 0 && ( */}
        <>
          <h2>Highlighted Keywords:</h2>
          {/* <ul>
            {keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul> */}
        </>
      {/* )} */}
      {/* {summary && ( */}
        <>
          <h2>Summary:</h2>
          {/* <p>{summary}</p> */}
        </>
      {/* )} */}
    </div>
    </div>


  );
};

export default FileUpload;
