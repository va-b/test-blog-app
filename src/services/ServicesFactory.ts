import { IEntity } from "@/models/abstractions";
import { ICrudService, IService } from "@/services/abstractions";
import LocalStorageCrudService from "@/services/LocalStorageCrudService";

export class ServicesFactory
{
    private servicesStorage: IService[] = [];

    private serviceRegister<TService extends IService>(S: () => TService, key: string): TService
    {
        if(!this.servicesStorage[key]) this.servicesStorage[key] = S();
        return this.servicesStorage[key];
    }

    public getBasicCrud<E extends IEntity>(k: EntitiesKeys): ICrudService<E>
    {
        return this.serviceRegister<ICrudService<E>>(() => new LocalStorageCrudService<E>(k), k)
    }
}

export type EntitiesKeys = "BlogEntry" | "CommentEntry";