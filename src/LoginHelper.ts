import { Cache, CacheStorage, StorageType } from "@rwsbillyang/preact-usecache"

export interface LoginResult{
 token: string;
 id?: string
}
interface MyHeaders {
    "Authorization"?: string | undefined
    "X-Auth-uId"?: string | undefined
    "X-Auth-oId"?: string | undefined
    "X-Auth-unId"?: string | undefined
    "X-Auth-UserId"?: string | undefined
    "X-Auth-ExternalUserId"?: string | undefined
    "X-Auth-SuiteId"?: string | undefined
    "X-Auth-CorpId"?: string | undefined
    "X-Auth-AgentId"?: number | string | undefined
}

export const LoginHelper = {
    getKey(): string {
        return "auth"
    },

    /**
     * 判断是否登录
     */
    isAuthenticated(): boolean {
        const bean = LoginHelper.getAuthBean()
        if (bean && bean.token)
            return true
        else
            return false
        
    },

    /**
     *  登录成功后的动作，记录下登录信息
     */
    saveAuthBean(authBean: LoginResult, storageType: number) {
        CacheStorage.saveObject(LoginHelper.getKey(), authBean, storageType)
    },
    /**
 * 
 * @param id 用户id字符串
 * @param token jwt token
 * @param level 用户等级
 * data class AuthBean(val id: String, val token: String, val level: Int)
 * */
    getAuthBean(): LoginResult | undefined {
        return CacheStorage.getObject(LoginHelper.getKey(), StorageType.BothStorage)
    },

    /**
     * 退出登录成功后的动作
     */
    onSignout(cb?: () => void) {
        const key = LoginHelper.getKey()
        Cache.evictCache(key, StorageType.BothStorage)

        if (cb) {
            cb()
        }
    },





    /**
     * 获取登录后的请求头
     * use-http会额外添加application/json请求头，故此处注释掉
     */
    getHeaders(): {} | undefined {
        const bean = LoginHelper.getAuthBean()
        if (!bean || !bean.token) return undefined
    

        const header: MyHeaders = {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            "Authorization": 'Bearer ' + bean.token
        }
        const accountId =  bean["id"]
        if (accountId) header["X-Auth-uId"] = accountId //app account Id 

        return header
    }
}


  /**
   * 返回url中或当前window.location.href中某个参数的值
   * @param paramKey 
   * @param url 
   * @returns 
   */
  export function getQueryString(paramKey: string, url?: string | undefined) {
    if (!url) {
        url = window.location.href
    }

    var index = url.indexOf(paramKey + "=");
    if (index == -1) {
        return "";
    }
    var getParamStr = url.slice(paramKey.length + index + 1);
    var nextparam = getParamStr.indexOf("&");
    if (nextparam != -1) {
        getParamStr = getParamStr.slice(0, nextparam);
    }
    return decodeURIComponent(getParamStr);
}