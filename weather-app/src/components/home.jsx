
// import {Data} from "../assets/in2"
import importedData from "../assets/in.json"

import { useEffect } from "react"
import axios from "axios"
import { BarChart } from "./weatherChart"


import logo from "../assets/309.gif"
import cloudimg from "../assets/cloudy.png"
import sunny from "../assets/sun.png"


import "./home.css"
import { useState } from "react"
import { GoSearch } from "react-icons/go"
import LoadingIcons from "react-loading-icons"
import { ImLocation } from "react-icons/im"


export const Home = () => {
    const [sunrise, setsunrise] = useState("")
    const [sunset, setsunset] = useState("")
    const [pressure, setpressure] = useState("")
    const [humidity, sethumidity] = useState("")
    const [geolocationflag, setgeolocationflag] = useState(true)
    const [long, setlong] = useState("")
    const [sevenDaysAvgTemp, SetsevenDaysAvgTemp] = useState([])
    const [lat, setlat] = useState("")
    const [data, setData] = useState([])
    const [inputflag, setinputflag] = useState(false)
    const [filtereddata, setfiltereddata] = useState(importedData.data)
    const [currentCity, setCurrentCity] = useState("Mumbai")



    useEffect(() => {
        if (navigator) {
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    setlat(position.coords.latitude)
                    setlong(position.coords.longitude)
                    //    console.log('latitude', position.coords.latitude, 
                    //                'longitude', position.coords.longitude);
                },
                function error(error_message) {
                    console.error('An error has occured while retrievinglocation', error_message)
                })
        }
        else {
            console.log('geolocation is not enabled on this browser')
        }
        // .then(()=>{
        if (geolocationflag) {

            axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=7cce5c92f806585e178639eeed84b7d7`).then((res) => {
                let name = res.data[0].name.split(" ")
                setCurrentCity(name[0])
                console.log(res.data[0])
                setgeolocationflag(false)
                // console.log(currentCity)
            })
        }
        // })

        const options = {
            method: 'GET',
            url: `https://aerisweather1.p.rapidapi.com/forecasts/${currentCity},IN`,
            headers: {
                'X-RapidAPI-Key': '1fa7ce84c9msh0f0deee15afc7bcp1e5a99jsn01f70dc4784f',
                'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
            }
        };
        axios.request(options).then((res) => {
            console.log(res.data.response[0].periods)
            let value = res.data.response[0].periods
            setpressure(value[0].pressureMB)
            sethumidity(value[0].humidity)
            let rise = value[0].sunriseISO.split("+")
            let set = value[0].sunsetISO.split("+")
            setsunrise(rise[1])
            setsunset(set[1])
            let arr = []
            value.map((elem) => {
                arr.push(elem.avgTempC)
                SetsevenDaysAvgTemp(arr)
            })
            setData(value)
        }).catch((err) => {
            console.log(err)
        })
    }, [currentCity])



    const handlechange = (e) => {

        const query = e.target.value
        if (query == "") {
            setfiltereddata(data.data)
            return
        }
        var updatedlist = [...filtereddata]
        updatedlist = updatedlist.filter((item) =>
            item.city.toLowerCase().indexOf(query.toLowerCase()) != -1
        )
        setfiltereddata(updatedlist)
    }

    return <>
        <div id="searchContainer">
            <i id="searchicon"> <GoSearch id="icon" /></i>
            <ImLocation id="locationtag" />
            <input onFocus={() => setinputflag(true)} placeholder={currentCity} id="searchbox" onChange={handlechange} type="text" name="" />
        </div>
        {
            inputflag ? <div id="citybox">
                {filtereddata?.map((el, i) => {
                    return <div key={i}>
                        <p onClick={() => {
                            setCurrentCity(el.city)
                            setinputflag(false)
                        }} id="city" >{el.city},{el?.admin_name}</p>
                        <hr />
                    </div>
                })}
            </div> : <>
            <div id="weeklyData">
                {
                    data?.map((elem, i) => {
                        const today = new Date(elem.timestamp * 1000);
                        const day1 = today.getDay();
                        let x = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                        return <div key={i} id="oneDay">
                            <p>{x[day1]}</p>
                            <p>{elem.minTempC}-{elem.maxTempC}C</p>
                            {elem.weather == "Sunny" ? <img src={sunny} alt="sunnyimg" /> : <img src={cloudimg} alt="cloudimg" />}
                            <p>{elem.weather}</p>
                        </div>
                    })
                }
            </div>
            <BarChart sunrise={sunrise} sunset={sunset} humidity={humidity} pressure={pressure} avgtemp={sevenDaysAvgTemp} />
            </>
        }
        {/* <Chart/> */}


    </>
}



{/* <LoadingIcons.Circles fill="violet" stroke="#98ff98"/>
        <LoadingIcons.Bars fill="yellow" fillOpacity={"1"} strokeWidth={"500px"} stroke="#98ff98"/>
        <LoadingIcons.Audio speed={.50} fill="red" stroke="black"/>
        <img src={logo} alt="" /> */}