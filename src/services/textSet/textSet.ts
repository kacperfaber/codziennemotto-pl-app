import {Text} from "./text";
import {JoinLink} from "../joinLink/joinLink";
import {Reader, ReaderIncludeUser} from "../reader/reader";

export interface TextSet {
    id: number;
    title: string;
    description: string;
    ownerId: number | null;
    texts: Array<Text> | undefined;
    joinLinks: Array<JoinLink> | undefined;
    readers: Array<ReaderIncludeUser> | undefined;
}