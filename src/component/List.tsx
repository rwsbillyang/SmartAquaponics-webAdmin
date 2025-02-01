

export const ListItem = (props: { name: string, desc?: String, to?: string }) => props.to ? <a class="weui-cell weui-cell_access" href={props.to}>
    <span class="weui-cell__bd" aria-hidden="true">
        <span>{props.name}</span>
    </span>
    <span class="weui-cell__ft" aria-hidden="true" >{props.desc}</span>
</a> : <div role="option" class="weui-cell ">
    <div class="weui-cell__bd">
        <p>{props.name}</p>
    </div>
    <div class="weui-cell__ft">{props.desc}</div>
</div>

export const List = (props: { title?: string, children?: preact.JSX.Element | preact.JSX.Element[] }) => <>
    {props.title && <div class="weui-cells__title">{props.title}</div>}
    <div class="weui-cells">
        {props.children}
    </div>
</>