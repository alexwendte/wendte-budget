export const isNumber = (str: string): boolean => !isNaN(str as any)
export const isNotNumber = (str: string): boolean => isNaN(str as any)
export const convertToNumAndRemoveDSign = (str: string): number => parseInt(str.slice(1), 10)
