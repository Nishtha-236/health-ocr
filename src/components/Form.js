import React from "react";
import "medblocks-ui";
import "medblocks-ui/dist/styles.js";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { allCompositions, doAql, getUID } from "./aql";
import axios from "axios";

export default function Form() {
  let form = React.useRef();
  const [loading, setLoading] = React.useState("false");
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const compositionId = searchParams.get("c");
  // const { id } = useParams();
  let id = "2ea2138d-e907-4832-ae2b-08829c21ffd7";
  let templateId = "health.ocr.v0";
  let encounterId = "2ea2138d-e907-4832-ae2b-08829c21ffd7";
  // console.log({ id, compositionId });
  let composer_name = "Nishtha";
  let openehrUrl = "http://localhost:8080";
  // let hermesUrl = "https://hermes-2-kbsdxvq3bq-el.a.run.app/v1";
  const openehr = axios.create({
    baseURL: `${openehrUrl}/ehrbase/rest`,
    withCredentials: true,
  });

  React.useEffect(() => {
    doAql(allCompositions(id), openehr).then((res) => {
      // console.log({ Data: res });
      // setDailyData(res);
    });
  }, []);

  const handleSubmit = async (e) => {
    const data = e.detail;
    setLoading(true);
    console.log("Form submitted");
    console.log({ data });
    try {
      if (compositionId) {
        const r = await openehr.put(
          `/ecis/v1/composition/${compositionId.split(":")[0]}`,
          data,
          {
            params: { format: "FLAT", templateId, ehrId: id },
          }
        );
      } else {
        const r = await openehr.post(
          "/ecis/v1/composition?templateId=" +
            templateId +
            "&ehrId=" +
            id +
            "&format=FLAT",
          data
        );
        // console.log(r);
        setLoading("success");
        if (r.status == 201) {
          console.log("Composition created successfully");
        }
      }
    } catch (e) {
      console.log(e);
      setLoading("failed");
    }
    setTimeout(() => {
      setLoading("false");
    }, 2000);
  };

  React.useEffect(() => {
    form.current.addEventListener("mb-submit", handleSubmit);
    form.current.ctx = {
      composer: {
        name: composer_name,
      },
      health_care_facility: {
        name: "Project",
        id: encounterId,
        id_scheme: "Project",
        id_namespace: "Project",
      },
    };
  }, []);
  return (
    <div className="p-10 m-10">
      <mb-form
        ref={form}
        class="flex flex-col gap-3 p-5 shadow-2xl rounded-lg border font-bold"
      >
      <h1 className="text-2xl font-bold text-center my-4">Patient Health Summary</h1>
      <mb-input textarea path="health.ocr.v0/clinical_synopsis/synopsis" label="Summary"></mb-input>

      <h1 className="text-xl font-bold pt-4">Vitals</h1>
      <div className="grid grid-cols-2 gap-4 shadow-md border p-6 rounded-lg shadow-gray-100 mb-4 bg-gray-50">
      <mb-quantity
        default="/min"
        path="health.ocr.v0/pulse_heart_beat/rate"
        label="Pulse Rate"
      >
        <mb-unit unit="/min" label="/min" min="" max="1000"></mb-unit>
      </mb-quantity>
      
      <mb-proportion
        path="health.ocr.v0/pulse_oximetry/spo"
        label="SpO₂"
        min="0"
        max="100"
        step="1"
        type="percent"
      ></mb-proportion>
      
      <mb-quantity
        default="mm[Hg]"
        path="health.ocr.v0/blood_pressure/systolic"
        label="Systolic Blood Pressure"
      >
        <mb-unit unit="mm[Hg]" label="mm[Hg]" min="" max="1000"></mb-unit>
      </mb-quantity>
      <mb-quantity
        default="mm[Hg]"
        path="health.ocr.v0/blood_pressure/diastolic"
        label="Diastolic Blood Pressure"
      >
        <mb-unit unit="mm[Hg]" label="mm[Hg]" min="" max="1000"></mb-unit>
      </mb-quantity>
      
      <mb-quantity
        default="/min"
        path="health.ocr.v0/respiration/rate"
        label="Respiration Rate"
      >
        <mb-unit unit="/min" label="/min" min="" max="200"></mb-unit>
      </mb-quantity>
      
      <mb-quantity
        default="cm"
        path="health.ocr.v0/height_length/height_length"
        label="Height"
      >
        <mb-unit unit="cm" label="cm" min="" max="1000"></mb-unit>
        <mb-unit unit="[in_i]" label="[in_i]" min="" max="250"></mb-unit>
      </mb-quantity>
      <mb-quantity
        default="kg"
        path="health.ocr.v0/body_weight/weight"
        label="Weight"
      >
        <mb-unit unit="kg" label="kg" min="" max="1000"></mb-unit>
        <mb-unit unit="[lb_av]" label="[lb_av]" min="" max="2000"></mb-unit>
        <mb-unit unit="g" label="g" min="" max="1000000"></mb-unit>
      </mb-quantity>
      
      <mb-quantity
        default="kg/m2"
        path="health.ocr.v0/body_mass_index/body_mass_index"
        label="Body mass index"
      >
        <mb-unit unit="kg/m2" label="kg/m2" min="" max="1000"></mb-unit>
        <mb-unit
          unit="[lb_av]/[in_i]2"
          label="[lb_av]/[in_i]2"
          min=""
          max="1000"
        ></mb-unit>
      </mb-quantity>
      
      <mb-quantity
        default="Cel"
        path="health.ocr.v0/body_temperature/temperature"
        label="Temperature"
      >
        <mb-unit unit="Cel" label="Cel" min="" max="100"></mb-unit>
        <mb-unit unit="[degF]" label="[degF]" min="30" max="200"></mb-unit>
      </mb-quantity>
      {/* <mb-input
        path="health.ocr.v0/body_temperature/anatomical_location/body_site_name"
        label="Body site name"
      ></mb-input> */}
      </div>

      <h1 className="text-xl font-bold pt-4">Laboratory Test Results</h1>  
      <div className="grid gap-4 shadow-md border p-6 rounded-lg shadow-gray-100 mb-4 bg-gray-50">
      <mb-input
        path="health.ocr.v0/laboratory_test_result/any_event:0/test_name"
        label="Test name"
      ></mb-input>
      <mb-date
        time
        path="health.ocr.v0/laboratory_test_result/any_event:0/overall_test_status_timestamp"
        label="Overall test status timestamp"
      ></mb-date>
      <mb-input
        path="health.ocr.v0/laboratory_test_result/any_event:0/laboratory_analyte_result:0/analyte_name"
        label="Analyte name"
      ></mb-input>
      <mb-quantity
        default=""
        path="health.ocr.v0/laboratory_test_result/any_event:0/laboratory_analyte_result:0/analyte_result:0"
        label="Analyte result"
      >
        <mb-unit unit="mg/dl" label="mg/dl" min="" max=""></mb-unit>
        <mb-unit unit="g/dl" label="g/dl" min="" max=""></mb-unit>
        <mb-unit unit="mmol/l" label="mmol/l" min="" max=""></mb-unit>
        <mb-unit unit="mg/l" label="mg/l" min="" max=""></mb-unit>
        <mb-unit unit="g/l" label="g/l" min="" max=""></mb-unit>
        <mb-unit unit="mmol" label="mmol" min="" max=""></mb-unit>
      </mb-quantity>
      {/* <mb-input-multiple
        path="health.ocr.v0/reason_for_encounter/contact_type"
        label="Contact type"
      ></mb-input-multiple> */}
      </div>

      <mb-input-multiple
        path="health.ocr.v0/reason_for_encounter/presenting_problem"
        label="Presenting problem"
      ></mb-input-multiple>
      <mb-input-multiple
        path="health.ocr.v0/story_history/any_event:0/story"
        label="Story/History"
      ></mb-input-multiple>
      <mb-input
        path="health.ocr.v0/physical_examination_findings/any_event:0/description"
        label="Description/Findings"
      ></mb-input>
      <div class="grid grid-cols-2 gap-4">
      <mb-input
        path="health.ocr.v0/problem_diagnosis:0/problem_diagnosis_name"
        label="Problem/Diagnosis name"
      ></mb-input>
      <mb-select
        path="health.ocr.v0/problem_diagnosis:0/diagnostic_certainty"
        label="Diagnostic certainty"
        terminology="local"
      >
        <mb-option value="at0074" label="Suspected"></mb-option>
        <mb-option value="at0075" label="Probable"></mb-option>
        <mb-option value="at0076" label="Confirmed"></mb-option>
      </mb-select>
      </div>
      <mb-input
        path="health.ocr.v0/problem_diagnosis:0/comment"
        label="Comment"
      ></mb-input>

      <h1 className="text-xl font-bold pt-4">Medication</h1>  
      <div className="grid gap-4 shadow-md border p-6 rounded-lg shadow-gray-100 mb-4 bg-gray-50">
      <mb-input
        path="health.ocr.v0/medication_order/order:0/medication_item"
        label="Medication item"
      ></mb-input>
      {/* <mb-input
        path="health.ocr.v0/medication_order/order:0/medication/name"
        label="Name"
      ></mb-input>
      <mb-input
        path="health.ocr.v0/medication_order/order:0/medication/form"
        label="Form"
      ></mb-input> */}
      <mb-quantity
        default="1"
        path="health.ocr.v0/medication_order/order:0/medication/prescribed_quantity"
        label="Prescribed Quantity"
      >
        <mb-unit unit="1" label="1" min="" max=""></mb-unit>
      </mb-quantity>
      {/* <mb-input
        path="health.ocr.v0/medication_order/order:0/medication/prescribed_quantity_unit"
        label="Prescribed Quantity Unit"
      ></mb-input> */}
      {/* <mb-quantity
        default="1"
        path="health.ocr.v0/medication_order/order:0/medication/available_quantity"
        label="Available Quantity"
      >
        <mb-unit unit="1" label="1" min="" max=""></mb-unit>
      </mb-quantity>
      <mb-input
        path="health.ocr.v0/medication_order/order:0/medication/available_quantity_unit"
        label="Available Quantity Unit"
      ></mb-input> */}
      <mb-input
        path="health.ocr.v0/medication_order/order:0/medication/description"
        label="Description of Medication"
      ></mb-input>
      <mb-input
        path="health.ocr.v0/medication_order/order:0/route"
        label="Route"
      ></mb-input>
      <mb-input
        path="health.ocr.v0/medication_order/order:0/overall_directions_description"
        label="Overall directions description"
      ></mb-input>
      <mb-quantity
        default=""
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/dosage/dose"
        label="Dose"
      ></mb-quantity>
      <mb-quantity
        default="1/d"
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/dosage/timing_-_daily/frequency"
        label="Frequency"
      >
        <mb-unit unit="1/d" label="1/d" min="1" max=""></mb-unit>
        <mb-unit unit="1/min" label="1/min" min="1" max=""></mb-unit>
        <mb-unit unit="1/s" label="1/s" min="1" max=""></mb-unit>
        <mb-unit unit="1/h" label="1/h" min="1" max=""></mb-unit>
      </mb-quantity>

      {/* <mb-input
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/dosage/timing_-_daily/timing_description"
        label="Timing description"
      ></mb-input>
      <mb-checkbox
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/dosage/timing_-_daily/as_required"
        label="As required"
      ></mb-checkbox>
      <mb-input
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/dosage/timing_-_daily/specific_event:0/event_name"
        label="Event name"
      ></mb-input> */}
      <mb-duration
        year
        month
        day
        week
        hour
        minute
        second
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/direction_duration"
        label="Direction duration"
      ></mb-duration>
      {/* <mb-quantity
        default=""
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/review_criterion/quantity_value"
        label="undefined"
      ></mb-quantity>
      <mb-count
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/review_criterion/count_value"
        label=""
        min="0"
        max="1"
      ></mb-count>
      <mb-input
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/review_criterion/text_value"
        label=""
      ></mb-input>
      <mb-date
        time
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/order_start_date_time"
        label="Order start date/time"
      ></mb-date>
      <mb-date
        time
        path="health.ocr.v0/medication_order/order:0/therapeutic_direction/order_stop_date_time"
        label="Order stop date/time"
      ></mb-date> */}
      {/* <mb-input-multiple
        path="health.ocr.v0/medication_order/order:0/additional_instruction"
        label="Additional instruction"
      ></mb-input-multiple>
      <mb-date
        time
        path="health.ocr.v0/medication_order/expiry_time"
        label="expiry_time"
      ></mb-date> */}
      </div>
      <mb-input
        path="health.ocr.v0/procedure:0/procedure_name"
        label="Procedure name"
      ></mb-input>
      <mb-input
        path="health.ocr.v0/procedure:0/description"
        label="Procedure description"
      ></mb-input>
      <mb-input
        path="health.ocr.v0/follow_up/current_activity:0/service_name"
        label="Follow up details"
      ></mb-input>
      <mb-date
        time
        path="health.ocr.v0/follow_up/current_activity:0/service_due"
        label="Follow up due"
      ></mb-date>
      {/* <mb-date
        time
        path="health.ocr.v0/follow_up/expiry_time"
        label="expiry_time"
      ></mb-date> */}
      <div>
      <mb-context path="health.ocr.v0/context/start_time"></mb-context>
      <mb-context path="health.ocr.v0/context/setting"></mb-context>
      <mb-context path="health.ocr.v0/clinical_synopsis/language"></mb-context>
      <mb-context path="health.ocr.v0/clinical_synopsis/encoding"></mb-context>
      <mb-context path="health.ocr.v0/clinical_synopsis/subject"></mb-context>
      <mb-context path="health.ocr.v0/pulse_heart_beat/time"></mb-context>
      <mb-context path="health.ocr.v0/pulse_heart_beat/language"></mb-context>
      <mb-context path="health.ocr.v0/pulse_heart_beat/encoding"></mb-context>
      <mb-context path="health.ocr.v0/pulse_heart_beat/subject"></mb-context>
      <mb-context path="health.ocr.v0/pulse_oximetry/time"></mb-context>
      <mb-context path="health.ocr.v0/pulse_oximetry/language"></mb-context>
      <mb-context path="health.ocr.v0/pulse_oximetry/encoding"></mb-context>
      <mb-context path="health.ocr.v0/pulse_oximetry/subject"></mb-context>
      <mb-context path="health.ocr.v0/blood_pressure/time"></mb-context>
      <mb-context path="health.ocr.v0/blood_pressure/language"></mb-context>
      <mb-context path="health.ocr.v0/blood_pressure/encoding"></mb-context>
      <mb-context path="health.ocr.v0/blood_pressure/subject"></mb-context>
      <mb-context path="health.ocr.v0/respiration/time"></mb-context>
      <mb-context path="health.ocr.v0/respiration/language"></mb-context>
      <mb-context path="health.ocr.v0/respiration/encoding"></mb-context>
      <mb-context path="health.ocr.v0/respiration/subject"></mb-context>
      <mb-context path="health.ocr.v0/height_length/time"></mb-context>
      <mb-context path="health.ocr.v0/height_length/language"></mb-context>
      <mb-context path="health.ocr.v0/height_length/encoding"></mb-context>
      <mb-context path="health.ocr.v0/height_length/subject"></mb-context>
      <mb-context path="health.ocr.v0/body_weight/time"></mb-context>
      <mb-context path="health.ocr.v0/body_weight/language"></mb-context>
      <mb-context path="health.ocr.v0/body_weight/encoding"></mb-context>
      <mb-context path="health.ocr.v0/body_weight/subject"></mb-context>
      <mb-context path="health.ocr.v0/body_mass_index/time"></mb-context>
      <mb-context path="health.ocr.v0/body_mass_index/language"></mb-context>
      <mb-context path="health.ocr.v0/body_mass_index/encoding"></mb-context>
      <mb-context path="health.ocr.v0/body_mass_index/subject"></mb-context>
      <mb-context path="health.ocr.v0/body_temperature/time"></mb-context>
      <mb-context path="health.ocr.v0/body_temperature/language"></mb-context>
      <mb-context path="health.ocr.v0/body_temperature/encoding"></mb-context>
      <mb-context path="health.ocr.v0/body_temperature/subject"></mb-context>
      <mb-context path="health.ocr.v0/laboratory_test_result/any_event:0/time"></mb-context>
      <mb-context path="health.ocr.v0/laboratory_test_result/language"></mb-context>
      <mb-context path="health.ocr.v0/laboratory_test_result/encoding"></mb-context>
      <mb-context path="health.ocr.v0/laboratory_test_result/subject"></mb-context>
      <mb-context path="health.ocr.v0/reason_for_encounter/language"></mb-context>
      <mb-context path="health.ocr.v0/reason_for_encounter/encoding"></mb-context>
      <mb-context path="health.ocr.v0/reason_for_encounter/subject"></mb-context>
      <mb-context path="health.ocr.v0/story_history/any_event:0/time"></mb-context>
      <mb-context path="health.ocr.v0/story_history/language"></mb-context>
      <mb-context path="health.ocr.v0/story_history/encoding"></mb-context>
      <mb-context path="health.ocr.v0/story_history/subject"></mb-context>
      <mb-context path="health.ocr.v0/physical_examination_findings/any_event:0/time"></mb-context>
      <mb-context path="health.ocr.v0/physical_examination_findings/language"></mb-context>
      <mb-context path="health.ocr.v0/physical_examination_findings/encoding"></mb-context>
      <mb-context path="health.ocr.v0/physical_examination_findings/subject"></mb-context>
      <mb-context path="health.ocr.v0/problem_diagnosis:0/language"></mb-context>
      <mb-context path="health.ocr.v0/problem_diagnosis:0/encoding"></mb-context>
      <mb-context path="health.ocr.v0/problem_diagnosis:0/subject"></mb-context>
      <mb-context path="health.ocr.v0/medication_order/order:0/timing"></mb-context>
      <mb-context path="health.ocr.v0/medication_order/order:0/action_archetype_id"></mb-context>
      <mb-context path="health.ocr.v0/medication_order/narrative"></mb-context>
      <mb-context path="health.ocr.v0/medication_order/language"></mb-context>
      <mb-context path="health.ocr.v0/medication_order/encoding"></mb-context>
      <mb-context path="health.ocr.v0/medication_order/subject"></mb-context>
      <mb-context path="health.ocr.v0/procedure:0/ism_transition/current_state"></mb-context>
      <mb-context path="health.ocr.v0/procedure:0/ism_transition/transition"></mb-context>
      <mb-context path="health.ocr.v0/procedure:0/ism_transition/careflow_step"></mb-context>
      <mb-context path="health.ocr.v0/procedure:0/time"></mb-context>
      <mb-context path="health.ocr.v0/procedure:0/language"></mb-context>
      <mb-context path="health.ocr.v0/procedure:0/encoding"></mb-context>
      <mb-context path="health.ocr.v0/procedure:0/subject"></mb-context>
      <mb-context path="health.ocr.v0/follow_up/current_activity:0/timing"></mb-context>
      <mb-context path="health.ocr.v0/follow_up/current_activity:0/action_archetype_id"></mb-context>
      <mb-context path="health.ocr.v0/follow_up/narrative"></mb-context>
      <mb-context path="health.ocr.v0/follow_up/language"></mb-context>
      <mb-context path="health.ocr.v0/follow_up/encoding"></mb-context>
      <mb-context path="health.ocr.v0/follow_up/subject"></mb-context>
      <mb-context path="health.ocr.v0/category"></mb-context>
      <mb-context path="health.ocr.v0/language"></mb-context>
      <mb-context path="health.ocr.v0/territory"></mb-context>
      <mb-context path="health.ocr.v0/composer"></mb-context>
      </div>
      <div className="flex justify-center">
          <mb-submit
            className="cursor-pointer flex border rounded p-2 px-4 border-primary text-primary uppercase text-sm font-bold hover:bg-primary hover:text-white"
            // onClick={(e) => handleSubmit(e)}
          >
            <sl-button variant="primary" class="w-40 pt-3">
              Submit
            </sl-button>
          </mb-submit>
      </div>
      </mb-form>
    </div>
  );
}
