import { CommentConstructor, IComment } from "@/models/CommentEntry";
import { AppState } from "@/store/appstore";
import { AbstractStateWithCrudable, GenerateStoreCrudMixin } from "@/store/StoreCrudMixin";
import { MergeDeep } from "@/utils/mergeobjs";
import { Module, StoreOptions } from "vuex";

export class CommentState extends AbstractStateWithCrudable<IComment>
{
    getEmptyModel = () => CommentConstructor();
}

export const commentStateModule: Module<CommentState, AppState> = MergeDeep({


} as StoreOptions<CommentState>, GenerateStoreCrudMixin<IComment, CommentState>("CommentEntry", CommentState));