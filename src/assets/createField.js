import { Field } from "redux-form";
import Input from "./Input";

const createField = (name) => {
        return <Field name={name} component={Input} />;
};

export default createField;