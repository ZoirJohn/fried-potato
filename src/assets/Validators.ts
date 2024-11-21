export type ValidatorOfLength = (num: number) => (value: string) => string | undefined
export type Validator = (value: string) => string | undefined

const maxLength: ValidatorOfLength = (max) => (value) => {
      return value && value.length > max ? `Maximum number of symbols is ${max}` : undefined
}
const minLength: ValidatorOfLength = (min) => (value) => {
      return value && value.length < min ? `Minimum number of symbols is ${min}` : undefined
}
const required: Validator = (value) => {
      return !value ? `This field is required` : undefined
}
export { maxLength, minLength, required }
