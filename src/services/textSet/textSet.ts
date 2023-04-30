import {Text} from "./text";

export interface TextSet {
    id: number;
    title: string;
    description: string;
    ownerId: number;
    texts: Array<Text> | undefined;
}