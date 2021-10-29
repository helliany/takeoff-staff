export const required = value => {
    if (value) return undefined;

    return "Field is required";
}

export const minLength = (minLength) => (value) => {
    if (value.length < minLength) return `Min length is ${minLength} symbols`;
    return undefined;
}
