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
  
  export const allCompositions = (ehrId) => {
    return `
        SELECT c/context/start_time/value as time,
        c/uid/value as uid,
        c/archetype_details/template_id/value as ctx_template_id,
        c/composer/name as composer_name
        from EHR e CONTAINS COMPOSITION c
        WHERE e/ehr_id/value='${ehrId}' AND c/archetype_details/template_id/value='hospital.notes.v0'
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
        WHERE e/ehr_id/value='${ehrId}' AND c/archetype_details/template_id/value='ubiqare.vitals.v0'
        LIMIT 10 ORDER BY time DESC
      `;
  };
  export const allScreening = (ehrId) => {
    return `
        SELECT c/context/start_time/value as time,
        c/uid/value as uid,
        c/archetype_details/template_id/value as ctx_template_id,
        c/composer/name as composer_name
        from EHR e CONTAINS COMPOSITION c
        WHERE e/ehr_id/value='${ehrId}' AND c/archetype_details/template_id/value='ubiqare.symptoms.v0'
        LIMIT 10 ORDER BY time DESC
      `;
  };
  
  export const doAql = async (q, openehr) => {
    const r = await openehr.post(`/openehr/v1/query/aql`, { q });
    // console.log({ Data: r.data });
    return formatAql(r.data);
  };