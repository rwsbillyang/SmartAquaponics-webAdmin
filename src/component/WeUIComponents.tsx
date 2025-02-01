


export const Loading = (props: { text?: String }) => <div className="weui-loadmore">
    <i className="weui-loading"></i>
    <span className="weui-loadmore__tips">{props.text || "加载中..."}</span>
</div>


export const OkMsg = (props: { title?: string, errMsg?: string, hrefText?: string, href?: string }) => <div className="weui-msg">
    <div className="weui-msg__icon-area"><i className="weui-icon-success weui-icon_msg"></i></div>
    <div className="weui-msg__text-area">
        <h2 className="weui-msg__title">{props.title}</h2>
        <p className="weui-msg__desc">{props.errMsg}</p>
        {props.href && <a class="weui-wa-hotarea weui-link" href={props.href}>{props.hrefText}</a>}
    </div>
</div>

export const ErrMsg = (props: { title?: string, errMsg?: string, hrefText?: string, href?: string }) => <div className="weui-msg">
    <div className="weui-msg__icon-area"><i className="weui-icon-warn weui-icon_msg"></i></div>
    <div className="weui-msg__text-area">
        <h2 className="weui-msg__title">{props.title || "出错了"}</h2>
        <p className="weui-msg__desc">{props.errMsg}</p>
        {props.href && <a class="weui-wa-hotarea weui-link" href={props.href}>{props.hrefText}</a>}
    </div>
</div>



