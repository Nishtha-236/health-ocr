import "./analytics.css";
// import Chart from 'chart.js/auto';

import React from "react";
import { useEffect, useState } from "react";
import { allCompositions, doAql, getComposition, getUID } from "./api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Analytics() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  //   const compositionsArray = [];
  const [compositionsArray, setCompositionsArray] = useState([]);

  useEffect(() => {
    const fetchCompositions = async () => {
      try {
        const res = await doAql(allCompositions(id));
        const compositionPromises = res.map(async (item) => {
          const compositionId = getUID(item.get("uid"));
          const composition = await getComposition(compositionId);
          return composition["composition"];
        });

        const compositions = await Promise.all(compositionPromises);
        setCompositionsArray(compositions); // Update state with the compositions

        console.log("Composition data:", compositions);
        console.log("Number of compositions:", compositions.length);
      } catch (error) {
        console.error("Error retrieving compositions:", error);
      }
    };

    fetchCompositions();
  }, []); // Ensure the useEffect runs only once

  const extractVitals = (composition) => {
    const vitals = {
      pulse:
        composition["health.ocr.v0/pulse_heart_beat/rate|magnitude"] +
        composition["health.ocr.v0/pulse_heart_beat/rate|unit"],
      bloodPressure: `${composition["health.ocr.v0/blood_pressure/systolic|magnitude"]}/${composition["health.ocr.v0/blood_pressure/diastolic|magnitude"]} ${composition["health.ocr.v0/blood_pressure/systolic|unit"]}`,
      respiration:
        composition["health.ocr.v0/respiration/rate|magnitude"] +
        composition["health.ocr.v0/respiration/rate|unit"],
      height:
        composition["health.ocr.v0/height_length/height_length|magnitude"] +
        composition["health.ocr.v0/height_length/height_length|unit"],
      weight:
        composition["health.ocr.v0/body_weight/weight|magnitude"] +
        composition["health.ocr.v0/body_weight/weight|unit"],
      BMI:
        composition["health.ocr.v0/body_mass_index/body_mass_index|magnitude"] +
        composition["health.ocr.v0/body_mass_index/body_mass_index|unit"],
      temperature:
        composition["health.ocr.v0/body_temperature/temperature|magnitude"] +
        "°" +
        composition["health.ocr.v0/body_temperature/temperature|unit"],
    };
    return vitals;
  };
  return (
    <>
      <section className="top">
        <div className="top-1">
          <h2>Diagnosis</h2>
        </div>
        <div className="top-2">
          <div className="top2-sp sp1">
            <h4>Date</h4>
            <p className="sp1-date">24/05/12</p>
          </div>
          <div className="top2-sp sp2">
            <h4 className="sp2-h1">Diagnosis</h4>
            <h5>Fever(finding)</h5>
          </div>
        </div>
      </section>

      <section className="bottom">
        <div className="b-left">
          <h3 className="bsp-h blh1">Blood Pressure</h3>
          {/* <canvas ref={bloodPressureChartContainer}></canvas> */}
        </div>
        <div className="b-right">
          <h3 className="bsp-h brh1">Pulse Rate</h3>
          {/* <canvas ref={pulseRateChartContainer}></canvas> */}
        </div>
      </section>

      <section className="form-history pr-8">
        <div className=" text-xl font-bold w-1/2">Past Encounters</div>
        {compositionsArray.map((item, index) => (
          <div>
            <div className="fd fd1 border rounded-lg shadow-sm mt-4">
              <div className="information"></div>
              <div className="information p-4">
                <h3 className="text-lg font-semibold">
                  {moment(item["health.ocr.v0/context/start_time"]).format(
                    "Do MMMM YYYY, h:mm A"
                  )}
                  {/* 29th April 2024, 1:30 PM */}
                </h3>
                <p>
                  Presenting Problem -{" "}
                  {
                    item[
                      "health.ocr.v0/reason_for_encounter/presenting_problem:0"
                    ]
                  }
                </p>
                <p>
                  Diagnosis -{" "}
                  {
                    item[
                      "health.ocr.v0/problem_diagnosis:0/problem_diagnosis_name"
                    ]
                  }
                </p>
              </div>
              <button
                id="expandBtn"
                onClick={toggleAccordion}
                className="flex items-center justify-center py-2 bg-gray-200 hover:bg-gray-300 rounded-b-lg"
              >
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isOpen && (
                <div id="medicalForm" className="form-container p-4 border-t">
                  {/* <p className="mf-heading font-semibold">Visit Reason</p>
                <p className="mf-h1-text mb-2">{item.visitReason}</p> */}
                  <p className="mf-heading font-semibold">Vitals</p>
                  <div className="mf-fields-info grid grid-cols-2 gap-4">
                    <div>
                      <p>
                        Pulse:{" "}
                        {item["health.ocr.v0/pulse_heart_beat/rate|magnitude"]}
                        {item["health.ocr.v0/pulse_heart_beat/rate|unit"]}
                      </p>
                    </div>
                    <div>
                      <p>
                        Blood Pressure:{" "}
                        {
                          item[
                            "health.ocr.v0/blood_pressure/systolic|magnitude"
                          ]
                        }
                        /
                        {
                          item[
                            "health.ocr.v0/blood_pressure/diastolic|magnitude"
                          ]
                        }{" "}
                        {item["health.ocr.v0/blood_pressure/systolic|unit"]}
                      </p>
                    </div>
                    <div>
                      <p>
                        Respiration:{" "}
                        {item["health.ocr.v0/respiration/rate|magnitude"]}
                        {item["health.ocr.v0/respiration/rate|unit"]}
                      </p>
                    </div>
                    <div>
                      <p>
                        Height:{" "}
                        {
                          item[
                            "health.ocr.v0/height_length/height_length|magnitude"
                          ]
                        }
                        {item["health.ocr.v0/height_length/height_length|unit"]}
                      </p>
                    </div>
                    <div>
                      <p>
                        Weight:{" "}
                        {item["health.ocr.v0/body_weight/weight|magnitude"]}
                        {item["health.ocr.v0/body_weight/weight|unit"]}
                      </p>
                    </div>
                    <div>
                      <p>
                        BMI:{" "}
                        {
                          item[
                            "health.ocr.v0/body_mass_index/body_mass_index|magnitude"
                          ]
                        }
                        {
                          item[
                            "health.ocr.v0/body_mass_index/body_mass_index|unit"
                          ]
                        }
                      </p>
                    </div>
                    <div>
                      <p>
                        Temperature:{" "}
                        {
                          item[
                            "health.ocr.v0/body_temperature/temperature|magnitude"
                          ]
                        }
                        °
                        {
                          item[
                            "health.ocr.v0/body_temperature/temperature|unit"
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <div id="fd fd2"></div>
          <div id="fd fd3"></div> */}
          </div>
        ))}
      </section>
    </>
  );
}
