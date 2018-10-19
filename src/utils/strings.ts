export const stringIsNullOrEmpty: Function = (str: string): boolean => (!str || 0 === str.length);

export const stringIsNullOrBlank: Function = (str: string): boolean => (!str || 0 === str.trim().length)