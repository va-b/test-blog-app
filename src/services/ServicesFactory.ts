import { IEntity } from "@/models/abstractions";
import { ICrudService } from "@/services/abstractions";
import LocalStorageCrudService from "@/services/LocalStorageCrudService";

export class ServicesFactory
{
    
    private servicesStore: any = {};

    public getBasicCrud<E extends IEntity>(k: EntitiesKeys): ICrudService<E>
    {
        if(!this.servicesStore[k])
            this.servicesStore[k] = new LocalStorageCrudService<E>(k);
        return this.servicesStore[k];
    }
}

export type EntitiesKeys = "BlogEntry" | "CommentEntry";