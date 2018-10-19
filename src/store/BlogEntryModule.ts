import { BlogEntryConstructor, IBlogEntry } from "@/models/BlogEntry";
import { AppState } from "@/store/appstore";
import { AbstractStateWithCrudable, GenerateStoreCrudMixin } from "@/store/StoreCrudMixin";
import { MergeDeep } from "@/utils/mergeobjs";
import { Module, StoreOptions } from "vuex";

export class BlogEntryState extends AbstractStateWithCrudable<IBlogEntry>
{
    getEmptyModel = () => BlogEntryConstructor();
}

export const blogeStateModule: Module<BlogEntryState, AppState> = MergeDeep({


} as StoreOptions<BlogEntryState>, GenerateStoreCrudMixin<IBlogEntry, BlogEntryState>("BlogEntry", BlogEntryState));