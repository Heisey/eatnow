
export const getKeyByValue = <T extends {}>(obj: T, value: any) => Object.keys(obj).find((key) => obj[key as keyof typeof obj] === value)