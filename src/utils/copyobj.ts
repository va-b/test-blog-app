/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function IsObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Object mapper
 * @param object
 * @param mapHook
 * @returns {object|array}
 */
function Map (input: object, mapHook: boolean): object
{
    if (!input) return null;

    let output: object = IsObject(input) ? {} : [];
    
    let dateRegExp: RegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z|)/;

    for (const key in input)
    {
        let type = typeof (input[key]);

        if (type === "undefined")
        {
            continue;
        }
        else if (mapHook && type === "string" && dateRegExp.test(input[key]))
        {
            output[key] = new Date(input[key]);
        }
        else if (type === "object")
        {
            if(input[key] instanceof Date) output[key] = input[key];
            else output[key] = Map(input[key], mapHook);
        }
        {
            output[key] = input[key];
        }
    }

    return output;
}

export const DefaultMapping = (input: object): object => Map(input, true);
export const DefaultCopy = (input: object): object => Map(input, false);