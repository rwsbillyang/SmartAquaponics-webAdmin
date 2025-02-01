export const Footer = (props: { text?: string, href?: string, hrefText?: string }) => {
    return <div className="weui-footer weui-footer_fixed-bottom">
        {props.href && <p class="weui-footer__links">
            <a href={props.href} className="weui-footer__link weui-wa-hotarea">{props.hrefText}</a>
        </p>}
        {props.text && <p className="weui-footer__text">{props.text}</p>}
    </div>
}