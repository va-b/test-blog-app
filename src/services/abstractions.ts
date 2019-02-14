import { IEntity } from "@/models/abstractions";

export interface ICrudService<T extends IEntity> extends IService
{
    getList(start: number, parentId: number): Promise<T[]>;
    getDetails(id: number): Promise<T>;
    toCreate( entity: T): Promise<number>;
    toUpdate( entity: T): Promise<number>;
    toDelete( id: number): Promise<boolean>;
}

export interface IService
{}