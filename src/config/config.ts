import configDev from "./config.dev.json";
import configProd from "./config.prod.json";

export interface IConfig {
    apiUrl: string
}


export const Config = process.env.profile == "prod" ? configProd : configDev;