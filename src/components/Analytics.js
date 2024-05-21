import './analytics.css';
// import Chart from 'chart.js/auto';

import React from "react";
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

export default function Analytics() {
    const bloodPressureChartContainer = useRef(null);
    const pulseRateChartContainer = useRef(null);

    useEffect(() => {
        // Blood Pressure Chart
        if (bloodPressureChartContainer && bloodPressureChartContainer.current) {
            const ctx = bloodPressureChartContainer.current.getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['29th April 2024, 1:30 PM'],
                    datasets: [{
                        label: 'Systolic Blood Pressure',
                        data: [{
                            x: '29th April 2024, 1:30 PM',
                            y: 110
                        }, {
                            x: '29th April 2024, 1:30 PM',
                            y: 78
                        }],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                parser: 'dd/MM/YYYY, h:mm A',
                                tooltipFormat: 'lll',
                                unit: 'day',
                                displayFormats: {
                                    day: 'DD MMM YYYY'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Blood Pressure'
                            }
                        }
                    }
                }
            });
        }
        // Pulse Rate Chart
        if (pulseRateChartContainer && pulseRateChartContainer.current) {
            const ctx = pulseRateChartContainer.current.getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['29th April 2024, 1:30 PM'],
                    datasets: [{
                        label: 'Pulse Rate',
                        data: [{
                            x: '29th April 2024, 1:30 PM',
                            y: 89
                        }],
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                parser: 'dd/MM/YYYY, h:mm A',
                                tooltipFormat: 'lll',
                                unit: 'day',
                                displayFormats: {
                                    day: 'DD MMM YYYY'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Pulse Rate'
                            }
                        }
                    }
                }
            });
        }
    }, []);

    return(
        <>
        <section class="top">
        <div class="top-1">
            <h2>Diagnosis</h2>
        </div>
        <div class="top-2">
            <div class="top2-sp sp1">
                <h4>Date</h4>
                <p class="sp1-date">24/05/12</p>
            </div>
            <div class="top2-sp sp2">
                <h4 class="sp2-h1">Diagnosis</h4>
                <h5>Fever(finding)</h5>
            </div>
        </div>
    </section>

    <section className="bottom">
                <div className="b-left">
                    <h3 className="bsp-h blh1">Blood Pressure</h3>
                    <canvas ref={bloodPressureChartContainer}></canvas>
                </div>
                <div className="b-right">
                    <h3 className="bsp-h brh1">Pulse Rate</h3>
                    <canvas ref={pulseRateChartContainer}></canvas>
                </div>
            </section>


    <section class="bottom">
        <div class="b-left">
            <h3 class="bsp-h blh1">Blood Pressure</h3>
            {/* <div class="bl-rec">No past record</div> */}
        </div>
        <div class="b-right">
            <h3 class="bsp-h brh1">Pulse Rate</h3>
            <div></div>
        </div>
    </section>

    <section class="form-history">
        <div class="f-head">Past Encounters</div>
        <div class="fd fd1">
            <div class="information">
                <h3>29th April 2024, 1:30 PM</h3>
                <p>CC</p>
                <p>Dx</p>
            </div>
            <button id="expandBtn" onclick="toggleForm()">▼</button>
            <div id="medicalForm" class="form-container">
                <p class="mf-heading">Visit Reason</p>
                <p class="mf-h1-text">test pdf, fever, headache</p>
                <p class="mf-heading">Vitals</p>
                <div class="mf-fields-info">
                    <div class="mf-fields">
                        <label for="vitalsinfo">Pulse Rate</label>
                        <span>89 /min</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">SpO2</label>
                        <span>99%</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">Temperature</label>
                        <span>89 deg</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">Systolic BP</label>
                        <span>110 mm</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">Diastolic BP</label>
                        <span>78 mm</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">Respiratory Rate</label>
                        <span>17 /min</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">Height</label>
                        <span>167 cm</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">Weight</label>
                        <span>6 kg</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">Body Mass Index</label>
                        <span>--</span>
                    </div>
                    <div class="mf-fields">
                        <label for="vitalsinfo">CRT</label>
                        <span>18 s</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="fd fd2">

        </div>
        <div id="fd fd3">

        </div>
    </section>
    </>
    )
}
