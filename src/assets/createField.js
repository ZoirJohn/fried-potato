import { Field } from "redux-form";
import { Input, InputCheckbox } from "./Input";

// * if type parameter is true, input is checkbox type. if not, it is just input

const createField = (name, placeholder, type, validators) => {
        return <Field name={name} component={type ? InputCheckbox : Input} placeholder={placeholder} validate={type ? [] : validators} />;
};

export default createField;