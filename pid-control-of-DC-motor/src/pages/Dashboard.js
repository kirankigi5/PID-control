import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// import { Line } from 'react-chartjs-2';
// import data from "./data";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//         title: {
//             display: true,
//             // text: 'RPM Values',
//         },
//     },
// };

// let labels = data.map(ele => ele.created_at);
// let vals = data.map(ele => ele.field1);
// 
// labels = labels.filter((ele, ind) => vals[ind] != 0);
// vals = vals.filter(ele => ele != 0)
// 
// const graphData = {
    // labels,
    // datasets: [
        // {
            // label: 'RPM',
            // data: vals,
            // borderColor: 'rgb(213, 245, 7)',
            // Color:'rgb(246, 247, 240)',
            // backgroundColor: 'rgba(183,15,0,1)',
        // },
    // ],
// };


const Dashboard = () => {
    const { user, isAuthenticated } = useAuth0();
    const [latestRpm, setLatestRpm] = useState(0);
    useEffect(() => {
        axios.get("https://api.thingspeak.com/channels/1848145/feeds.json?results=2")
            .then(response => {
                // console.log(response.data)
                const tmp = response.data["feeds"];
                const fieldVal = tmp[tmp.length - 1]["field1"];
                if (fieldVal != 0) setLatestRpm(fieldVal);
            })
            .catch(err => console.log(err))
    }, [])
    const [inputData, setInputData] = useState({
        'kp': 0,
        'ki': 0,
        'kd': 0,
        'req_rpm': 0
    })

    const submitData = () => {
        axios.post("https://api.thingspeak.com/update.json", {
            "api_key": "GV7P12GFV84Y7NYE",
            "field3": inputData['kp']*1000,
            "field4": inputData['ki']*1000,
            "field5": inputData['kd']*1000,
            "field6": inputData['req_rpm'] 
            })
        .then(response => { 
            console.log(response)
            console.log(inputData) 
        })
        .catch(err => { 
            console.log(err)
            alert(err)
        })
    }


    const resetData = () => {
        axios.post("https://api.thingspeak.com/update.json", {
            "api_key": "GV7P12GFV84Y7NYE",
            "field3": 0,
            "field4": 0,
            "field5": 0,
            "field6": 0 
        })
        .then(response => { console.log(response) })
        .catch(err => console.log(err))
    }

    return (
        isAuthenticated &&
        (//replace with chart
            <>
                {/* <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>

                    {JSON.stringify(user, null, 2)}
                </div> */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "3.75rem", margin: "20px" }}>
                        Dashboard
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        // background: "rgb(169,169,169)",
                        margin: "20px",
                        // border: "thin solid white",
                        // boxShadow: "0 0 10px 0 white",

                    }}>
                        <div style={{
                            padding: "10px",
                            width: "300px",
                            boxSizing: "border-box",
                            border: "solid white",
                            margin: "10px",
                            textAlign: "right"
                        }}>{latestRpm}  RPM</div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", boxSizing: "border-box" }}>
                    {/* <div style={{ width: "100%", margin: "30px", backgroundColor: "#d3d5e6" }}> */}
                        {/* <Line options={options} data={graphData} /> */}
                    <iframe style={{ width: "100%", height: "500px", border: "1px solid #cccccc" }} src="https://thingspeak.com/channels/1848145/charts/1?bgcolor=%23ffffff&color=%23d62020&days=1&dynamic=true&results=35&title=PID_Control&type=spline&xaxis=Time&yaxis=RPM">
                    </iframe>
                    {/* </div> */}
                    <iframe style={{ width: "100%", height: "500px", border: "none", margin: "30px" }} src="https://ef87-2409-4070-2114-6655-b0f2-863a-e2e2-a66f.ngrok.io/">
                    </iframe>
                    <iframe style={{ width: "100%", height: "500px", border: "1px solid #cccccc" }} src="https://thingspeak.com/channels/1848145/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div>
                        <div>KP</div>
                        <input type="number" step="0.0001" value={inputData['kp']} onChange={(e) => setInputData({ ...inputData, "kp": e.target.value })} />
                    </div>
                    <div>
                        <div>KI</div>
                        <input type="number" step="0.0001" value={inputData['ki']} onChange={(e) => setInputData({ ...inputData, "ki": e.target.value })} />
                    </div>
                    <div>
                        <div>KD</div>
                        <input type="number" step="0.0001" value={inputData['kd']} onChange={(e) => setInputData({ ...inputData, "kd": e.target.value })} />
                    </div>
                    <div>
                        <div>RPM</div>
                        <input type="number" value={inputData['req_rpm']} onChange={(e) => setInputData({ ...inputData, "req_rpm": e.target.value })} />
                    </div>
                    <button onClick={() => submitData()}>
                        Submit
                    </button>
                </div>
                <div style={{display: "flex" }}>
                    <button variant="secondary" onClick={() => resetData()}>
                        Reset
                    </button>
                </div>
            </>
        ))
}

export default Dashboard