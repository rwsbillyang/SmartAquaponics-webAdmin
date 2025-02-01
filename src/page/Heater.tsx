import { useState } from "preact/hooks";
import { Form, Input, NumberInput, Switch } from "../component/Form";
import { Page } from "../component/Page";
import {  Heater } from "./DeviceConfig";
import { ToastInfo } from "../component/Toast";
import { EnableCustomGpio, defaultHeater } from "../Config";

export const HeaterPage = () => {
    const [heater, setHeater] = useState<Heater>(defaultHeater)
    const [toastInfo, setToastInfo] = useState<ToastInfo | undefined>()

    const formAction = () => {
        return false
    }

    return (
        <Page>
            <Form title="加热棒" formAction={formAction} toastInfo={toastInfo}>
                <Switch id="enbaled" label="是否启用" value={heater.enabled} onChangeCb={(v) => { heater.enabled = v }} />
                <Input id="startTime" label="开始时间" type="time" value={heater.startTime} onChangeCb={(v) => { heater.startTime = v }} />
                <Input id="endTime" label="结束时间" type="time" value={heater.endTime} onChangeCb={(v) => { heater.endTime = v }} />
               {EnableCustomGpio ? <NumberInput id="outputGpio" label="控制信号线" min={0} max={1024} value={heater.outputGpio} onChangeCb={(v) => { if (v !== undefined) heater.outputGpio = v }} />:<></>}
            </Form>
        </Page>
    );
}