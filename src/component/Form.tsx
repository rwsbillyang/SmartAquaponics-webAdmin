import { useState } from "preact/hooks";
import { Button } from "./Button";
import { Toast, ToastInfo } from "./Toast";


export const Form = (props: { title?: String, toastInfo?: ToastInfo, buttonText?:string, formAction: () => boolean, children?: preact.JSX.Element | preact.JSX.Element[] }) => {
    return (
        <div class="weui-form">
            <div class="weui-form__bd">
                {
                    props.title && <div class="weui-form__text-area">
                        <h2 class="weui-form__title">{props.title}</h2>
                    </div>
                }

                <div class="weui-form__control-area">
                    <div class="weui-cells__group weui-cells__group_form">
                        {props.children}
                    </div>
                </div>
            </div>

            <div class="weui-form__ft">
                <div class="weui-form__opr-area">
                    <Button onClick={props.formAction} type="primary" name={props.buttonText || "提交"} />
                </div>
            </div>
            {props.toastInfo && <Toast text={props.toastInfo.text} type={props.toastInfo.type}/>}
        </div>

    );
}

export interface SelectOption {
    label: string,
    value: string|number
}
export const Select = (props: { id: string, label: string, value?: string, options: SelectOption[], onChangeCb: (v: string) => void }) => {
    return (
        <label for={props.id} class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <span class="weui-label">{props.label}</span>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name={props.id} id={props.id} onChange={(e) => {
                    let target = e.currentTarget as HTMLSelectElement;
                    const v = target.value
                    props.onChangeCb(v)
                }}>
                    {props.options.map(e => <option selected={e.value === props.value} value={e.value}>{e.label}</option>)}
                </select>
            </div>
        </label>
    );
}
export const NumberSelect = (props: { id: string, label: string,  value?: number, options: SelectOption[], onChangeCb: (v: number) => void }) => {
    return (
        <label for={props.id} class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <span class="weui-label">{props.label}</span>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name={props.id} id={props.id} onChange={(e) => {
                    let target = e.currentTarget as HTMLSelectElement;
                    const v = +target.value
                    props.onChangeCb(v)
                }}>
                    {props.options.map(e => <option selected={e.value === props.value} value={e.value}>{e.label}</option>)}
                </select>
            </div>
        </label>
    );
}

export const Switch = (props: { label: string, id: string, value: boolean, disabled?: boolean, 
    onChangeCb: (v: boolean) => void }) => {
    const [isChecked, setIsChecked] = useState(props.value);
    return (
        <label for={props.id} class="weui-cell weui-cell_active weui-cell_switch">
            <div class="weui-cell__bd" id="cb_txt" aria-hidden="true">{props.label}</div>
            <div class="weui-cell__ft">
                <input aria-labelledby="cb_txt" class="weui-switch" type="checkbox" name={props.id} id={props.id} disabled={props.disabled} checked={isChecked}
                    onChange={() => { setIsChecked(!isChecked); props.onChangeCb(!isChecked); }} />
            </div>
        </label>
    );
}

export const Input = (props: {
    id: string, label: string, 
    type: "number" | "tel" | "email" | "date" | "time" | "password" | "text" | "hidden" , 
    onChangeCb: (v?: string) => void,
    value?: string,
    placeholder?: string, 
    tip?: string,
    pattern?: string,
    disabled?: boolean
}) => {
    const [showTip, setShowTip] = useState(false);
    const [value, setValue] = useState(props.value)
    return (
        <label for={props.id} class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">{props.label}</span></div>
            <div class="weui-cell__bd">
            <input class="weui-input" type={props.type} value={value || ''}
                    onChange={(e) => {
                        let target = e.currentTarget as HTMLInputElement;
                        const v = target.value
                        setValue(v)
                        props.onChangeCb(v)
                    }} placeholder={props.placeholder} disabled={props.disabled} id={props.id} name={props.id} pattern={props.pattern} />
            </div>
            {
                props.tip && <div class="weui-cell__ft">
                    <button type="button" onClick={() => { setShowTip(true); return false; }} class="weui-btn_reset weui-btn_icon">
                        <i role="img" class="weui-icon-info-circle"></i>
                    </button>
                </div>
            }
            {
                showTip && <div class="js_dialog" role="dialog" aria-hidden="true" aria-modal="true">
                    <div class="weui-mask"></div>
                    <div class="weui-dialog weui-dialog_btn-wrap">
                        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
                        <div class="weui-dialog__bd">{props.tip}</div>
                        <div class="weui-dialog__ft">
                            <a role="button" href="javascript:" onClick={() => { setShowTip(false); return false; }} class="weui-dialog__btn weui-dialog__btn_primary">关闭</a>
                        </div>
                    </div>
                </div>
            }

        </label>
    );
}



export const NumberInput = (props: {
    id: string, label: string, 
    onChangeCb: (v?: number) => void,
    value?: number,
    placeholder?: string, 
    tip?: string,
    max?: number, min?: number,
    disabled?: boolean
}) => {
    const [showTip, setShowTip] = useState(false);
    const [value, setValue] = useState(props.value)
    return (
        <label for={props.id} class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">{props.label}</span></div>
            <div class="weui-cell__bd">
            <input class="weui-input" type="number" value={value}
                    max={props.max || Number.MAX_SAFE_INTEGER} min={props.min || Number.MIN_SAFE_INTEGER}
                    onChange={(e) => {
                        let target = e.currentTarget as HTMLInputElement;
                        const v = +target.value
                        setValue(v)
                        props.onChangeCb(v)
                    }} placeholder={props.placeholder} disabled={props.disabled} id={props.id} name={props.id} pattern="[0-9]*" />
            </div>
            {
                props.tip && <div class="weui-cell__ft">
                    <button type="button" onClick={() => { setShowTip(true); return false; }} class="weui-btn_reset weui-btn_icon">
                        <i role="img" class="weui-icon-info-circle"></i>
                    </button>
                </div>
            }
            {
                showTip && <div class="js_dialog" role="dialog" aria-hidden="true" aria-modal="true">
                    <div class="weui-mask"></div>
                    <div class="weui-dialog weui-dialog_btn-wrap">
                        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
                        <div class="weui-dialog__bd">{props.tip}</div>
                        <div class="weui-dialog__ft">
                            <a role="button" href="javascript:" onClick={() => { setShowTip(false); return false; }} class="weui-dialog__btn weui-dialog__btn_primary">关闭</a>
                        </div>
                    </div>
                </div>
            }

        </label>
    );
}