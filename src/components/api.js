import axios from "axios";
let openehrUrl = "http://localhost:8080";
// let hermesUrl = "https://hermes-2-kbsdxvq3bq-el.a.run.app/v1";
const openehr = axios.create({
  baseURL: `${openehrUrl}/ehrbase/rest`,
  withCredentials: true,
});


export const formatAql = (aqlResultData) => {
    const { columns, rows } = aqlResultData;
    const data = rows.map((row) => {
      return new Map(
        row.map((item, i) => {
          return [columns[i].name, item];
        })
      );
    });
    // console.log({ data });
    return data;
  };
  
  export const getUID = (compositionId) => {
    return compositionId.split(":")[0];
  };

  export const getComposition = async (compositionId) => {
    const r = await openehr.get(`/ecis/v1/composition/${compositionId}?format=FLAT`);
    return r.data;
  };
  
  export const allCompositions = (ehrId) => {
    return `
        SELECT c/context/start_time/value as time,
        c/uid/value as uid,
        c/archetype_details/template_id/value as ctx_template_id,
        c/composer/name as composer_name
        from EHR e CONTAINS COMPOSITION c
        WHERE e/ehr_id/value='${ehrId}' AND c/archetype_details/template_id/value='health.ocr.v0'
        LIMIT 10 ORDER BY time DESC
      `;
  };
  export const allVitals = (ehrId) => {
    return `
        SELECT c/context/start_time/value as time,
        c/uid/value as uid,
        c/archetype_details/template_id/value as ctx_template_id,
        c/composer/name as composer_name
        from EHR e CONTAINS COMPOSITION c
        WHERE e/ehr_id/value='${ehrId}' AND c/archetype_details/template_id/value='health.ocr.v0'
        LIMIT 10 ORDER BY time DESC
      `;
  };
  // export const allScreening = (ehrId) => {
  //   return `
  //       SELECT c/context/start_time/value as time,
  //       c/uid/value as uid,
  //       c/archetype_details/template_id/value as ctx_template_id,
  //       c/composer/name as composer_name
  //       from EHR e CONTAINS COMPOSITION c
  //       WHERE e/ehr_id/value='${ehrId}' AND c/archetype_details/template_id/value='health.ocr.v0'
  //       LIMIT 10 ORDER BY time DESC
  //     `;
  // };
  
  export const doAql = async (q) => {
    const r = await openehr.post(`/openehr/v1/query/aql`, { q });
    return formatAql(r.data);
  };