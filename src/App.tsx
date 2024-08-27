import { useEffect } from "react";
import Loader from "./assets/Loader";
import HeaderComponent from "./components/header/HeaderComponent";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { withRouter } from "./hoc/withRouter";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";

const App = (props: any) => {
      useEffect(() => {
            props.initializeApp();
      }, []);

      if (!props.initialized) {
            return <Loader />;
      }
      return (
            <div data-testid='app' className='App'>
                  <HeaderComponent imgLogo={props.imgLogo} />
                  <div data-testid='container' className='container'>
                        <Main state={props.state} />
                        <Sidebar />
                  </div>
            </div>
      );
};

const mapStateToProps = (state: any) => {
      return {
            initialized: state.app.initialized,
      };
};

const Wrapper = compose(
      withRouter,
      connect(mapStateToProps, {
            initializeApp,
      })
)(App);

export default Wrapper;
