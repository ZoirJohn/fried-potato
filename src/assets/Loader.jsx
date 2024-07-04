import loader from '../img/loader.gif';

export default (props) => props.isFetching ? <img src={loader} alt="loader"/> : null;

