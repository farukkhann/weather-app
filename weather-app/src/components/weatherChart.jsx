import { Chart } from 'react-chartjs-2';
import snriseSunset from "../assets/sunriseSunset.png"

import 'chart.js/auto';
import "./chart.css"
import cloudimg from "../assets/cloudy.png"



export const BarChart = (prop) => {
    const labels = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        "Sat"
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Avg temprature',
            backgroundColor: 'rgb(117, 185, 248)',
            borderColor: 'rgb(117, 185, 248)',
            data: prop?.avgtemp,
        },
        ]
    };

    //   console.log(prop)
    return <>
        <div id='chartsContainer'>
            <div id='tempbox'>
                <h1>{prop.avgtemp[0]}°C</h1>
                <img src={cloudimg} alt="" />
            </div>
            <Chart type='line' width={500} height={300} data={data} />
            <div id='pressHumid'>
                <div id='pressure'>
                    <p>Pressure</p>
                    <p>{prop.pressure}hpa</p>
                </div>
                <div id='humidity' >
                    <p>Humidity</p>
                    <p>{prop.humidity}%</p>
                </div>
            </div>
            <div id='Sunrisesunset'>
                <div id='set1'>
                    <p>Sunrise</p>
                    <p>{prop.sunrise}am</p>
                </div>
                <div id='set'>
                    <p>Sunset</p>
                    <p>{prop.sunset}pm</p>
                </div>
            </div>
            <div>
                <img id='sunsetimg' src={snriseSunset} alt="" />
            </div>
        </div>

    </>
}