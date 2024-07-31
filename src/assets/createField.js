import { Field } from "redux-form";
import { Input, InputCheckbox } from "./Input";

const createField = (name, placeholder, type) => {
        return <Field name={name} component={type ? Input : InputCheckbox} placeholder={placeholder} />;
};

export default createField;