export const Button = (props: {
    name: string, type?: "primary" | "default" | "warn",
    loading?: boolean, mini?: boolean, disabled?: boolean,
    onClick?: () => void
}) => {
    const t = (props.type || "default")
    let c = "weui-btn weui-btn_" + t

    if (props.loading == true) c += (" weui-btn_loading")
    if (props.mini) c += " weui-btn_mini"
    if (props.disabled) c += " weui-btn_disabled" //weui-btn_disabled

    return <a role="button" onClick={props.onClick} className={c} style={{ width: "62%" }}>{props.name}{props.loading == true && <i class="weui-mask-loading"></i>}</a>
}
