import { RouteProps, RouterOnChangeArgs } from "preact-router"
import { Home } from './page/Home';
import { About } from './page/About';
import { Settings } from './page/Settings';
import { PwdLogin } from './page/LoginPage';
import { AutoFeeder } from './page/AutoFeeder';
import { MainPump } from './page/MainPump';
import { HeaterPage } from './page/Heater';
import { SecondPump } from './page/SecondPump';
import { defaultFeeder, defaultHeater, defaultMainPump, defaultSecondPump } from "./Config";
import { Page } from "./component/Page";
import { pageCenter } from "./style";
import { LoginHelper } from './LoginHelper';


//https://www.javascriptcn.com/preact/6742e596002158bc93d54cf6.html
//https://www.npmjs.com/package/preact-router
export async function routeGuard(e: RouterOnChangeArgs) {
    //console.log("handleRoute:", e)
    if (e.url.indexOf("/admin") === 0) {
      const isAuthed = LoginHelper.isAuthenticated();
      const from = e.url
      if (isAuthed === false) {
        const loginUrl = '/login?from='+from
        console.log("not login, goto: "+loginUrl)
        //window.location.href = loginUrl//route(loginUrl, true);
      }
    }
  };

const Redirect = (props: any) => {
    const to = props.to
    console.log("Redirect to " + to)
    //route(to, true);
    window.location.href = to
    return null;
}


const NotFound = (props: any) => <Page><div style={pageCenter}>404 Not Found: {props.url}</div></Page>


export const AppRoutes: RouteProps<any>[] = [

    {
        path: "/about",
        component: About
    },
    {
        path: "/login",
        component: PwdLogin
    },
    {
        path: "/admin",
        component: Home
    },
    {
        path: "/admin/settings",
        component: Settings
    },
    {
        path: "/admin/" + defaultFeeder.id,
        component: AutoFeeder
    },
    {
        path: "/admin/" + defaultHeater.id,
        component: HeaterPage
    },
    {
        path: "/admin/" + defaultMainPump.id,
        component: MainPump
    },
    {
        path: "/admin/" + defaultSecondPump.id,
        component: SecondPump
    },
    {
        path: "/",
        to: "/admin",
        component: Redirect
    },
    {
        default: true,
        component: NotFound
    }
]