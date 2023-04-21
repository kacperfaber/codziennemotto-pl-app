export interface IConfig {
    apiUrl: string
}


export const Config = process.env.CONFIG as unknown as IConfig;