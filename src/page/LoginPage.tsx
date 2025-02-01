import { useState } from 'preact/hooks';
import { Loading } from '../component/WeUIComponents';
import { Page } from '../component/Page';
import { FetchParams, StorageType, cachedFetch } from '@rwsbillyang/preact-usecache';
import { route } from 'preact-router';
import { LoginHelper, LoginResult, getQueryString } from '../LoginHelper';

import { Form, Input } from '../component/Form';
import { HOST } from '../Config';
import { ToastInfo, ToastType } from '../component/Toast';



export const PwdLogin = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [toastInfo, setToastInfo] = useState<ToastInfo | undefined>()
    
    const from = getQueryString("from") || "/admin/" // 
    console.log("PwdLogin: from="+from)
    
    const formAction = () => {
        if (!username || !password) {
            alert("请输入用户名和密码")
            return false
        }
        const params: FetchParams<LoginResult> = {
            url: HOST+`/api/login`,
            data: { name: username, pwd: password },
            method: "POST",
            attachAuthHeader: false,
            storageType: StorageType.OnlySessionStorage,
            isShowLoading: false,
            onDone: () => { setToastInfo({ type: ToastType.None, text: "" }) },
            onOK: (data) => {
                LoginHelper.saveAuthBean(data, StorageType.BothStorage)
                if (from) {
                    console.log("jump to from=" + from)
                    route(from)  //window.location.href = from  //navigate跳不过去，改用此行
                    setLoginSuccess(true)
                } else
                alert("登录成功，请自行打开管理页面")
            },
            onKO: (code: string, msg?: string) => { alert(code + ": " + msg) },
            onErr: (msg: string) => { alert(msg) }
        }
        cachedFetch(params)
        return false
    }


    return (loginSuccess ?
        <Loading text="登录成功，跳转中..."/>
        :<Page>
             <Form title="用户登录" buttonText="登录" formAction={formAction} toastInfo={toastInfo}>
                <Input label='用户名' id="username" type="text" onChangeCb={(v)=>{setUsername(v)}}/>
                <Input label='密码' id="pwd" type="password" onChangeCb={(v)=>{setPassword(v)}}/>
             </Form>
        </Page>)
}
