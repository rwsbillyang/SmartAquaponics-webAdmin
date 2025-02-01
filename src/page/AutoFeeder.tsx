import { useState } from "preact/hooks";
import { Form, Input, NumberInput, Switch } from "../component/Form";
import { Page } from "../component/Page";
import { Feeder } from "./DeviceConfig";
import { ToastInfo } from "../component/Toast";
import { EnableCustomGpio, defaultFeeder } from "../Config";

export const AutoFeeder = () => {
    const [feeder, setFeeder] = useState<Feeder>(defaultFeeder)
    const [toastInfo, setToastInfo] = useState<ToastInfo | undefined>()

    const formAction = () => {
        return false
    }

    return (
        <Page>
             <Form title="自动喂食器" formAction={formAction} toastInfo={toastInfo}>
                <Switch id="enbaled" label="是否启用" value={feeder.enabled} onChangeCb={(v) => { feeder.enabled = v }} />
                <Input id="startTime" label="开始时间" type="time" value={feeder.startTime} onChangeCb={(v) => { feeder.startTime = v }} />
                <Input id="endTime" label="结束时间" type="time" value={feeder.endTime} onChangeCb={(v) => { feeder.endTime = v }} />
                {EnableCustomGpio ? <NumberInput id="outputGpio" label="控制信号线" min={0} max={1024}  value={feeder.outputGpio} onChangeCb={(v) => { if (v !== undefined) feeder.outputGpio = v }} />:<></>}
            </Form>
        </Page>
    );
}