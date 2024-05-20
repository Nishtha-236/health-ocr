const patients = require("./fhir/Patients.json");
const encounters = require("./fhir/Encounters.json");
const axios = require("axios");


const fhirBaseUrl = "http://localhost:8081/fhir";

async function postDataToFHIR() {
  try {
    console.log("Posting Patients");
    await axios.post(`${fhirBaseUrl}`, patients);

    console.log("Posting Encounters");
    await axios.post(`${fhirBaseUrl}`, encounters);

    console.log("Data successfully posted to FHIR server.");
  } catch (error) {
    console.error("Error posting data to FHIR server:", error.message);
    // Handle errors appropriately
  }
}

// Call the function to initiate data posting
postDataToFHIR();
