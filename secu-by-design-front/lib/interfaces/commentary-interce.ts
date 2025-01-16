export interface addCommentary {
    date: Date;
    commentary: string;
    subject: string;
    auther: string;
}

export interface getCommentary {
    _id: string;
    idClient: string
    date: Date;
    commentary: string;
    subject: string;
    auther: string;
}