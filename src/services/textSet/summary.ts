import {TextSet} from "./textSet";

export interface SummaryItem {
    textSet: TextSet;
    text: string; // TODO: I don't know it can be null.
}

export type Summary = Array<SummaryItem>;