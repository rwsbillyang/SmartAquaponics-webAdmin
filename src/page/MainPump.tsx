import { Page } from "../component/Page";
import { Form, Input, NumberInput, NumberSelect, Switch } from "../component/Form";
import { FetchParams, StorageType, cachedFetch, CacheStorage } from "@rwsbillyang/preact-usecache";
import { ToastInfo, ToastType } from "../component/Toast";
import { Pump } from "./DeviceConfig";
import { useEffect, useState } from "preact/hooks";
import { EnableCustomGpio, HOST, defaultMainPump } from "../Config";



export const MainPump = () => {
    //const { loading, entity, errMsg } = useCache<Pump|undefined>("/api/admin/"+defaultMainPump.id, defaultMainPump.id);

    const [pump, setPump] = useState<Pump>(defaultMainPump)
    const [toastInfo, setToastInfo] = useState<ToastInfo | undefined>()

    useEffect(() => {
        setToastInfo({ type: ToastType.Loading, text: "加载中..." })
        const params: FetchParams<Pump> = {
            url: HOST + "/api/admin/" + defaultMainPump.id,
            shortKey: defaultMainPump.id,
            method: "GET",
            attachAuthHeader: true,
            storageType: StorageType.OnlySessionStorage,
            isShowLoading: false,
            onDone: () => { setToastInfo({ type: ToastType.None, text: "" }) },
            onOK: (v) => {
                v.id = defaultMainPump.id
                if (!v.timer) v.timer = defaultMainPump.timer
                if (!v.top) v.top = defaultMainPump.top
                if (!v.bottom) v.top = defaultMainPump.bottom
                if (!v.startTime) v.startTime = defaultMainPump.startTime
                if (!v.endTime) v.endTime = defaultMainPump.endTime

                setPump(v)
            },
            onKO: (code: string, msg?: string) => { console.log("code=" + code + ", msg=" + msg); alert(code + ": " + msg) },
            onErr: (msg: string) => {
                setToastInfo({ type: ToastType.None, text: "" })
                console.log("onErr: msg=" + msg);
                alert(msg)
            }
        }
        cachedFetch(params)
    }, [])

    const formAction = () => {
        setToastInfo({ type: ToastType.Loading, text: "提交中..." })
        const params: FetchParams<Pump> = {
            url: "/api/admin/save/" + defaultMainPump.id,
            data: pump,
            method: "POST",
            attachAuthHeader: true,
            storageType: StorageType.OnlySessionStorage,
            isShowLoading: false,
            onDone: () => { setToastInfo({ type: ToastType.None, text: "" }) },
            onOK: () => {
                //setToastInfo({type: ToastType.Success, text: "提交成功"})
                alert("提交成功")
                CacheStorage.saveObject(defaultMainPump.id, pump)
                //setTimeout(()=>{setToastInfo({type: ToastType.None, text: ""})}, 2000)
            },
            onKO: (code: string, msg?: string) => { alert(code + ": " + msg) },
            onErr: (msg: string) => { alert(msg) }
        }
        cachedFetch(params)
        return false
    }

    return (
        <Page>
            <Form title="主泵" formAction={formAction} toastInfo={toastInfo}>
                <Switch id="enbaled" label="是否启用" value={pump.enabled} onChangeCb={(v) => { pump.enabled = v }} />
                <Input id="startTime" label="开始时间" type="time" value={pump.startTime} onChangeCb={(v) => { pump.startTime = v }} />
                <Input id="endTime" label="结束时间" type="time" value={pump.endTime} onChangeCb={(v) => { pump.endTime = v }} />


                <NumberSelect id="mode" label="控制方式" value={pump.mode} options={[{ label: "水位监测控制", value: 2 }, { label: "时间控制", value: 0 }]}
                    onChangeCb={(v) => { pump.mode = v }} />

                {pump.mode === 0 ? <>
                    <NumberInput id="delay" label="几秒后开启" min={0} max={3600} value={pump.timer.delay} onChangeCb={(v) => { if (v !== undefined) pump.timer.delay = v }} />
                    <NumberInput id="on" label="持续时长(分钟)" min={1} max={720} value={pump.timer.on} onChangeCb={(v) => { if (v !== undefined) pump.timer.on = v }} />
                    <NumberInput id="off" label="关闭时长(分钟)" min={1} max={720} value={pump.timer.off} onChangeCb={(v) => { if (v !== undefined) pump.timer.off = v }} />
                </> : <></>
                }

                {pump.mode === 2 ? <>
                    <NumberSelect id="topWater" label="若高水位：" options={[{ label: "有水", value: 1 }, { label: "无水", value: 0 }]}
                        value={pump.top.water} onChangeCb={(v) => { pump.top.water = v }} />
                    <NumberSelect id="topPower" label="则水泵：" options={[{ label: "打开", value: "1" }, { label: "关闭", value: 0 }]}
                        value={pump.top.power} onChangeCb={(v) => { pump.top.power = v }} />

                    <NumberSelect id="bottomWater" label="若低水位：" options={[{ label: "有水", value: 1 }, { label: "无水", value: 0 }]}
                        value={pump.bottom.water} onChangeCb={(v) => { pump.bottom.water = v }} />
                    <NumberSelect id="bottomPower" label="则水泵：" options={[{ label: "打开", value: 1 }, { label: "关闭", value: 0 }]}
                        value={pump.bottom.power} onChangeCb={(v) => { pump.bottom.power = v }} />
                    {
                        EnableCustomGpio && <>
                            <NumberInput id="outputGpio" label="高水位传感器信号线" min={0} max={1024} value={pump.top.sigNum} onChangeCb={(v) => { if (v !== undefined) pump.top.sigNum = v }} />
                            <NumberInput id="outputGpio" label="低水位传感器信号线" min={0} max={1024} value={pump.bottom.sigNum} onChangeCb={(v) => { if (v !== undefined) pump.bottom.sigNum = v }} />
                        </> 
                    }
                   </> :<></> 
                }

                  {EnableCustomGpio? <NumberInput id="outputGpio" label="控制信号线" min={0} max={1024} value={pump.outputGpio} onChangeCb={(v) => { if (v !== undefined) pump.outputGpio = v }} /> : <></>}  
                </Form>
        </Page>
    );
}