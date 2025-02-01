import { Feeder, Heater, Pump } from "./page/DeviceConfig";

export const EnableCustomGpio = true;

export const HOST = "http://192.168.111.133"



export const defaultMainPump:Pump = {
    id: "mainPump",
    enabled: true,
    outputGpio:5,
    startTime:"00:00",
    endTime:"23:59",

    mode: 2,
    top: {water: 1, power:0, sigNum:3},
    bottom:{water: 0, power:1, sigNum:4},
    timer:{delay:5, on:30, off:30}
}

export const defaultSecondPump:Pump = {
    id: "secondPump",
    enabled: true,
    outputGpio:1,
    startTime:"00:00",
    endTime:"23:59",

    mode: 0,
    top: {water: 1, power:0, sigNum:3},
    bottom:{water: 0, power:1, sigNum:4},
    timer:{delay:5, on:5, off:55}
}

export const defaultHeater: Heater = {
    id: "heater",
    enabled: true,
    outputGpio:12,
    startTime:"00:00",
    endTime:"23:59",

    t1: 20, //turn on if temperature < t1
    t2: 25, //turn off 
    sigNum: 6  //signal gpio number
}

export const defaultFeeder: Feeder = {
    id: "feeder",
    enabled: true,
    outputGpio:13,
    startTime:"00:00",
    endTime:"23:59",

    datetimes:["6:00", "12:00","18:00","24:00"],
    on: 15 //unit seconds
}