import { IEntity } from "@/models/abstractions";

export interface IComment extends IEntity
{
    userName: string;
    text: string;
}

export const CommentConstructor = (): IComment => ({
    id: null,
    userName: "",
    text: ""
});