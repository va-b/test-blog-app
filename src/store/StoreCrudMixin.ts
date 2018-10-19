import { IEntity } from "@/models/abstractions";
import iapp from "@/plugins/iapp";
import { EntitiesKeys } from "@/services/ServicesFactory";
import { AppState } from "./appstore";
import { ActionContext, StoreOptions } from "vuex";
import { DefaultCopy } from "@/utils/copyobj";

export abstract class AbstractStateWithCrudable<E extends IEntity>
{
    public currentEntityId: number | null = null;
    public parentEntityId: number | null = null;
    public entities: E[] = [];
    public isCacheValid: boolean = false;

    public isEditMode: boolean = false;
    public isLoading: boolean = false;
    public isSaving: boolean = false;

    public abstract getEmptyModel: () => E;
    public editedEntity: E = null;
}

export interface IStoreCrudMixin<E extends IEntity, S extends AbstractStateWithCrudable<E>>
    extends StoreOptions<S>
{
    namespaced: boolean;
    state: S;
    mutations: {
        updateEditedEntity(state: S, data: E);
        setCurrentItem( state: S, id: number );
        resetCurrentItem( state: S );
        setParentEntityId( state: S, parentId: number );
    };
    actions: {
        getList( me: ActionContext<S, AppState> ): Promise<E[]>;
        getListPart( me: ActionContext<S, AppState> ): Promise<E[]>;
        getDetails( me: ActionContext<S, AppState>, id: number ): Promise<E>;
        save( me: ActionContext<S, AppState> ): Promise<any>;
        delete( me: ActionContext<S, AppState>, id: number ): Promise<void>;
    };
    getters: {
    };
}

export function GenerateStoreCrudMixin <E extends IEntity, S extends AbstractStateWithCrudable<E>>
    ( apiKey: EntitiesKeys, aState: { new(): S; } )
    : IStoreCrudMixin<E, S> {
    return {
        namespaced: true,
        state: new aState(),
        mutations: {
            updateEditedEntity(state: S, data: E)
            {
                state.editedEntity = data;
            },
            setParentEntityId( state: S, parentId: number )
            {
                state.parentEntityId = parentId;
            },
            setCurrentItem( state: S, id: number )
            {
                state.isEditMode = true;
                state.currentEntityId = id;
                state.editedEntity = DefaultCopy((<E[]>state.entities).find(x => x.id == state.currentEntityId)) as E;
            },
            resetCurrentItem( state: S )
            {
                state.isEditMode = false;
                state.currentEntityId = null;
                state.editedEntity = state.getEmptyModel();
            },
        },
        actions: {
            async getListPart( me: ActionContext<S, AppState> ): Promise<E[]>
            {
                me.state.isLoading = true;
                let data = await iapp.serviceFactory.getBasicCrud<E>(apiKey).getList(me.state.entities.length, me.state.parentEntityId);
                me.state.entities.push(...data);
                me.state.isLoading = false;
                return data;
            },
            async getList( me: ActionContext<S, AppState> ): Promise<E[]>
            {
                if(me.state.isCacheValid) return me.state.entities;
                me.state.isLoading = true;
                let data = await iapp.serviceFactory.getBasicCrud<E>(apiKey).getList(0, me.state.parentEntityId);
                me.state.entities = data;
                me.state.isLoading = false;
                me.state.isCacheValid = true;
                return data;
            },
            async getDetails( me: ActionContext<S, AppState>, id: number ): Promise<E>
            {
                me.state.isLoading = true;
                let data = await iapp.serviceFactory.getBasicCrud<E>(apiKey).getDetails(id);
                let index = me.state.entities.findIndex(x => x.id == data.id);
                me.state.entities[index] = data;
                me.state.isLoading = false;
                return data;
            },
            async save( me: ActionContext<S, AppState> ): Promise<E>
            {
                me.state.isCacheValid = false;
                me.state.isSaving = true;
                let refreshed: any;
                try {
                    let obj = me.state.editedEntity;
                    let data: number | string | null;

                    if (!obj.id) {
                        data = await iapp.serviceFactory.getBasicCrud<E>(apiKey).toCreate(obj);
                        refreshed = await me.dispatch('getDetails', data);
                    }
                    else {
                        data = await iapp.serviceFactory.getBasicCrud<E>(apiKey).toUpdate(obj);
                        refreshed = await me.dispatch('getDetails', data);
                    }
                }
                catch(Exception)
                {
                    //TO DO: ОБРАБОТАТЬ
                    refreshed = me.state.editedEntity;
                }

                me.state.isSaving = false;
                return refreshed;
            },
            async delete( me: ActionContext<S, AppState>, id: number ): Promise<void>
            {
                me.state.isSaving = true;
                let res: boolean = await iapp.serviceFactory.getBasicCrud<E>(apiKey).toDelete(id)
                if(res)
                {
                    let i: number = me.state.entities.findIndex(x => x.id == id);
                    me.state.entities.splice(i, 1);
                }
                me.state.isSaving = false;
            }
        },
        getters: {
        },
    } as IStoreCrudMixin<E, S>;
}