import Stream from "mithril/stream";
import {User} from "../../services/user/user";
import stream from "mithril/stream";

class _UserStore {
    // TODO: 'current' is set in authenticationService.ts, but it's no auto-init [from index or anything]
    public current: Stream<User | undefined> = stream<undefined | User>(undefined);
}

export const UserStore = new _UserStore();