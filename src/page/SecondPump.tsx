import { Page } from "../component/Page";
import { Form, Input, NumberInput, Switch } from "../component/Form";
import { ToastInfo } from "../component/Toast";
import { useState } from "preact/hooks";
import { Pump } from "./DeviceConfig";
import { EnableCustomGpio, defaultSecondPump } from "../Config";

export const SecondPump = () => {
    const [pump, setPump] = useState<Pump>(defaultSecondPump)
    const [toastInfo, setToastInfo] = useState<ToastInfo | undefined>()
    
    const formAction = () => {
        return false
    }
    
    return (
        <Page>
            <Form title="副泵" formAction={formAction} toastInfo={toastInfo}>
                <Switch id="enbaled" label="是否启用" value={pump.enabled} onChangeCb={(v) => { pump.enabled = v }} />
                <Input id="startTime" label="开始时间" type="time" value={pump.startTime} onChangeCb={(v) => { pump.startTime = v }} />
                <Input id="endTime" label="结束时间" type="time" value={pump.endTime} onChangeCb={(v) => { pump.endTime = v }} />
                {EnableCustomGpio ? <NumberInput id="outputGpio" label="控制信号线" min={0} max={1024} value={pump.outputGpio} onChangeCb={(v) => { if (v !== undefined) pump.outputGpio = v }} />:<></>}

            </Form>
        </Page>
    );
}