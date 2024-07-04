import Main from './components/Main';
import Sidebar from './components/Sidebar';
import HeaderComponent from './components/header/HeaderComponent';
import {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import Loader from './assets/Loader';
import {withRouter} from './hoc/withRouter';


const App = (props) => {
	useEffect(() => {
		props.initializeApp();
	}, []);

	if (!props.initialized) {
		return <Loader/>;
	}
	return (
		<div data-testid="app" className="App">
			<HeaderComponent imgLogo={props.imgLogo}/>
			<div data-testid="container" className="container">
				<Main
					state={props.state}/>
				<Sidebar/>
			</div>
		</div>
	);
};


const mapStateToProps = (state) => {
	return {
		initialized: state.app.initialized,
	};
};

const Wrapper = compose(withRouter, connect(mapStateToProps,
	{
		initializeApp,
	},
))
(App);

export default Wrapper;