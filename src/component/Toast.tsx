
export enum ToastType {
    None,
    Success,
    Warn,
    Loading,
    Text,
    LongText
}
export interface ToastInfo{
    text: string
    type: ToastType 
}

export const Toast = (props: ToastInfo)=>{
    const type = props.type
    if(type === ToastType.None) return <></>
    if(type === ToastType.Success) return <SuccessToast text={props.text}/>
    if(type === ToastType.Warn ) return <WarnToast text={props.text}/>
    if(type === ToastType.Loading ) return <LoadingToast text={props.text}/>
    if(type === ToastType.Text ) return <TextToast text={props.text}/>
    if(type === ToastType.LongText) return<LongTextToast text={props.text}/>
    return <></>
}

export const SuccessToast = (props: { text?: string }) => <div role="alert">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast__wrp">
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">{props.text || "搞定!"}</p>
        </div>
    </div>
</div>

export const WarnToast = (props: { text: string }) => <div role="alert">
    <div class="weui-mask_transparent"></div>
        <div class="weui-toast__wrp">
          <div class="weui-toast">
              <i class="weui-icon-warn weui-icon_toast"></i>
              <p class="weui-toast__content">{props.text}</p>
          </div>
        </div>
    </div>

export const LoadingToast = (props: { text?: string }) => <div role="alert">
<div class="weui-mask_transparent"></div>
        <div class="weui-toast__wrp">
          <div class="weui-toast">
              <span class="weui-primary-loading weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
              </span>
              <p class="weui-toast__content">{props.text || "正在加载..."}</p>
          </div>
        </div>
    </div>


export const TextToast = (props: { text: string }) => <div role="alert">
    <div class="weui-mask_transparent"></div>
        <div class="weui-toast__wrp">
          <div class="weui-toast weui-toast_text">
              <p class="weui-toast__content">{props.text}</p>
          </div>
        </div>
    </div>

export const LongTextToast = (props: { text: string }) => <div role="alert">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast__wrp">
        <div class="weui-toast weui-toast_text-more">
            <i class="weui-icon-warn weui-icon_toast"></i>
            <p class="weui-toast__content">{props.text}</p>
        </div>
    </div>
</div>