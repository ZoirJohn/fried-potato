import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {configureStore} from '@reduxjs/toolkit';

const mockStore = configureStore([]);

test('renders children of App component', () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>,
	);
	const wrapper = screen.getByTestId('app');

	expect(wrapper).toBeInTheDocument();
});