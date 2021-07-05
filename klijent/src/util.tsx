export const SERVER = 'https://localhost:4000'
export function setFormState<T>(setState: (val: T) => void) {
    return function (e: any) {
        const value = e.currentTarget.value;
        setState(value);
    }
}
export function onTableRowClick<T>(val: T, setState: (setter: (prev: T | undefined) => T | undefined) => void) {

    setState(prev => {
        if (prev === val) {
            return undefined
        }
        return val
    })
}