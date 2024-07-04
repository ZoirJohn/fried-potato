const maxLength = (max) => (value) => {
	return value && value.length > max ? `Maximum number of symbols is ${max}` : undefined;
};
const minLength = (min) => (value) => {
	return value && value.length < min ? `Minimum number of symbols is ${min}` : undefined;
};
const required = (value) => {
	return !value ? `This field is required` : undefined;
};

export {maxLength, minLength, required};