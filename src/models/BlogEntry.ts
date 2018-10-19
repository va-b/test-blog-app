import { IEntity } from "@/models/abstractions";

export interface IBlogEntry extends IEntity
{
    title: string;
    description: string;
    full: string;
    imgUrl: string;
}

export const BlogEntryConstructor = ():IBlogEntry => ({
    id: null,
    description: "",
    full: "",
    title: "",
    imgUrl: ""
});