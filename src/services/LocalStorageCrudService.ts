import { IEntity } from "@/models/abstractions";
import { ICrudService } from "@/services/abstractions";
import { EntitiesKeys } from "@/services/ServicesFactory";
import { DefaultMapping } from "@/utils/copyobj";

export default class LocalStorageCrudService<T extends IEntity>
    implements ICrudService<T>
{
    protected readonly ks: string;
    protected readonly getKey: (id: number) => string;
    protected readonly keyFromStr: (key: string) => number;

    constructor(protected readonly entityKey: EntitiesKeys)
    {
        this.ks = this.entityKey + '_key';
        this.getKey = (id: number) => `${this.entityKey}_${id}`;
        this.keyFromStr = (key: string) => parseInt(key.split("_")[1]);

        if(window.localStorage.getItem(this.ks) == undefined)
            window.localStorage.setItem(this.ks, JSON.stringify([]));
    }

    private get keys(): number[]
    {
        let res: string = window.localStorage.getItem(this.ks);
        return JSON.parse(res) as number[];
    }

    private set keys(v: number[])
    {
        let res: string = JSON.stringify(v);
        window.localStorage.setItem(this.ks, res);
    }

    public async toCreate( entity: T ): Promise<number>
    {
        const newid: number = this.keys.length > 0  ? this.keys[this.keys.length] + 1 : 0;
        entity.id = newid;
        let res: string = JSON.stringify(entity);
        window.localStorage.setItem(this.getKey(newid), res);
        await this.imitateAjax(100);
        return newid;
    }

    public async toUpdate( entity: T ): Promise<number>
    {
        let res: string = JSON.stringify(entity);
        window.localStorage.setItem(this.getKey(entity.id), res);
        await this.imitateAjax(100);
        return entity.id;
    }

    public async toDelete( id: number ): Promise<boolean>
    {
        window.localStorage.removeItem(this.getKey(id));
        const removeKeyIndex: number = this.keys.findIndex(x => x == id);
        this.keys.splice(removeKeyIndex, 1);
        await this.imitateAjax(50);
        return true;
    }

    public async getDetails( id: number ): Promise<T>
    {
        let res: string = window.localStorage.getItem(this.getKey(id));
        await this.imitateAjax(100);
        return DefaultMapping(JSON.parse(res)) as T;
    }

    public async getList( start: number, parentId: number ): Promise<T[]>
    {
        let storeKeys: string[];
        let items: T[];
        const end: number = start + 10;
        let trueEnd: number;

        await this.imitateAjax(200);

        if(!!parentId)
        {
            storeKeys = this.keys.map(x => this.getKey(x));
            items = storeKeys
                .map(x => DefaultMapping(JSON.parse(window.localStorage.getItem(x))) as T)
                .filter(x => x.parentId == parentId);
            trueEnd = ( end < items.length - 1) ? end : items.length - 1;
            return items.slice(start, trueEnd);
        }

        trueEnd = ( end < this.keys.length - 1) ? end : this.keys.length - 1;
        storeKeys = this.keys.slice(start, trueEnd).map(x => this.getKey(x));
        items = storeKeys.map(x => DefaultMapping(JSON.parse(window.localStorage.getItem(x))) as T);
        return items;
    }

    private async imitateAjax(ms): Promise<void> {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }

}