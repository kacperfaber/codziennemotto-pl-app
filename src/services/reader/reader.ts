export interface Reader {
    id: number;
    textSetId: number;
    userId: number;
}

export interface ReaderIncludeUser {
    userId: number;
    userName: string;
    reader: Reader;
}