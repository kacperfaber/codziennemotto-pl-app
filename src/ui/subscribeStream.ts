import Stream from "mithril/stream";
import {redraw} from "mithril";
export function subscribeStream(...streams: Stream<any>[]) {
    streams.forEach(x => x.map(() => redraw()));
}