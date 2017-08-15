import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as actionCreators from '../../actions/auth';

/* application components */
import { LoginHeader } from '../../components/LoginHeader';
import { Header } from '../../components/Header';
// import { Footer } from '../../components/Footer';


/* global styles for app */
import './styles/app.scss';


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };


  render() {
    return (
            <MuiThemeProvider
              muiTheme={getMuiTheme({
               palette: {
                primary1Color: '#778899',
                primary2Color: '#2173B3',
                primary3Color: '#A9D2EB',
                accent1Color: '#ED3B3B',
                accent2Color: '#ED2B2B',
                accent3Color: '#F58C8C',
               },
            })}
            >
                <section>
                {
                  !this.props.isAuthenticated ?
                    <LoginHeader />
                  :
                    <Header />
                }
                    <div
                      className="container"
                    >
                        {this.props.children}
                    </div>
                </section>
            </MuiThemeProvider>
        );
  }
}
App.propTypes = {
  isAuthenticated: React.PropTypes.bool,
};
export { App };

