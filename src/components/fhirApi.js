
import axios from 'axios';

const fhirBaseUrl = 'http://localhost:8081/fhir';

const headers = {
  'Content-Type': 'application/json',
};

export const getAllResources = (resourceType) => {
  return axios.get(`${fhirBaseUrl}/${resourceType}`, { headers });
};

export const getResourceById = (resourceType, id) => {
  return axios.get(`${fhirBaseUrl}/${resourceType}/${id}`, { headers });
};

export const updateResourceById = (resourceType, id, newData) => {
  return axios.put(`${fhirBaseUrl}/${resourceType}/${id}`, newData, { headers });
};
