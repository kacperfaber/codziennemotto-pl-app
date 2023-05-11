import {Text} from "./text";
import {JoinLink} from "../joinLink/joinLink";

export interface TextSet {
    id: number;
    title: string;
    description: string;
    ownerId: number | null;
    texts: Array<Text> | undefined;
    joinLinks: Array<JoinLink> | undefined;
}