export const convertToArray = (arg: unknown) => {
    return Array.isArray(arg) ? arg : [arg]
}