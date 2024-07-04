import {maxLength, minLength} from '../../assets/Validators';
import {Field, reduxForm} from 'redux-form';
import Input from '../../assets/Input';

const maximum = maxLength(30);
const minimum = minLength(2);

const AddMessageForm = (props) => {
	return <form onSubmit={props.handleSubmit}>
		<Field component={Input} validate={[maximum, minimum]} name="AddMessageForm"/>
		<button>Send</button>
	</form>;
};

const AddMessageRedux = reduxForm({form: 'AddMessageForm'})(AddMessageForm);

export default AddMessageRedux;