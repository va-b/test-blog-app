import {IsObject} from "./copyobj";

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function MergeDeep(target, ...sources): object
{
    if (!sources.length) return target;
    
    const source = sources.shift();

    if (IsObject(target) && IsObject(source)) 
    {
        for (const key in source) 
        {
            if (IsObject(source[key])) 
            {
                if (!target[key]) Object.assign(target, { [key]: {} });
                MergeDeep(target[key], source[key]);
            } 
            else 
            {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return MergeDeep(target, ...sources);
}