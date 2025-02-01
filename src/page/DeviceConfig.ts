export interface TimerConfig{
    delay: number; //unit s
    on:number; //unit Minutes
    off: number;//unit Minutes
}

export interface PowerSwitch{
    id: string;
    enabled: boolean; //false 未启用， true 启用
    outputGpio: number; //power relay controll gpio num

    startTime?: string;
    endTime?: string;

    state?: number; //0:off, 1:on, 2: keep old state
    time?: number; //last update
}

export interface WaterMonitorConfig{
    water: number; //0: no water, 1: has water
    power: number; //0: turn off, 1 turn on
    sigNum: number; //signal gpio number
}

export interface Pump extends PowerSwitch{
    mode: number; //2:water level monitor, 0: timer,
    top: WaterMonitorConfig;
    bottom: WaterMonitorConfig;
    timer:TimerConfig;
}

export interface Heater extends PowerSwitch{
    t1: number; //turn on if temperature < t1
    t2: number; //turn off if temperature >= t2
    sigNum: number; //signal gpio number
}

export interface Feeder extends PowerSwitch{
    datetimes: string[]; //datetime array
    on:number; //unit seconds
}
