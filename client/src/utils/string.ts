
export const capitalize = (args: string) => args.charAt(0).toUpperCase() + args.slice(1)

export const capitalizeAllWords = (args: string) => args.split(' ').map(dataSet => capitalize(dataSet)).join(' ')