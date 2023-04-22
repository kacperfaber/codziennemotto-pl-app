import Mithril, {request} from "mithril";
export async function httpRequest<T>(options: Mithril.RequestOptions<T> & {url: string}): Promise<T> {
    return request(options);
}