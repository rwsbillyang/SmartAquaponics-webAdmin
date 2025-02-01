
import { HOST } from "../Config";
import { List, ListItem } from "../component/List";
import { Page } from "../component/Page";
import { Loading } from "../component/WeUIComponents";

import {useCache} from "@rwsbillyang/preact-usecache"

interface SystemState{
    envTemperature?: string;
    envHumidity?: string;
    waterTemperature?: string;
    heater?: string;
    mainPump?: string;
    secondPump?: string;
    feeder?:string
}

 
export const Home = () => {
    //console.log(props);

    const { loading, entity, errMsg } = useCache<SystemState>(HOST + "/api/admin/systemState", "systemState");

    return (
        <Page title="鱼菜共生" spacing={true}>

            <List>
                <ListItem name="环境温度" desc={entity?.envTemperature} />
                <ListItem name="环境湿度" desc={entity?.envHumidity} />

                <ListItem name="鱼缸水温" desc={entity?.waterTemperature} />
                <ListItem name="加热棒" to="/admin/heater" desc={entity?.heater} />

                <ListItem name="主泵" to="/admin/mainPump" desc={entity?.mainPump} />
                <ListItem name="副泵" to="/admin/secondPump" desc={entity?.secondPump} />

                <ListItem name="自动喂食器" to="/admin/feeder" desc={entity?.feeder} />

                <ListItem name="系统设置" to="/admin/settings" />
            </List>


            <div>
               {"something wrong: " + errMsg}
               {loading ? <Loading /> : <></>}
            </div>

           
        </Page>
    );
}

