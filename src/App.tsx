import './App.css';
import React from 'react';
import Login from './components/login/Login';
import EventsRecord from './components/events_record/EventsRecord';

interface AppState{
  isValidUserLoggedIn: boolean;
}

interface AppProps{}

class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps, state: AppState){
    super(props,state);
    this.state = {
      isValidUserLoggedIn: (sessionStorage.getItem("isValidUserLoggedIn") == null) ? false : true
    }
  }

  onLoggedIn = () => {
    this.setState({
      isValidUserLoggedIn: true
    });
  }

  onLoggedOut = () => {
    this.setState({
      isValidUserLoggedIn: false
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          {
            this.state.isValidUserLoggedIn ? <EventsRecord /> : <Login 
              onLoginSuccess={this.onLoggedIn}
              onLogOut={this.onLoggedOut}
            />
          }
        </header>
      </div>
    );
  }
}

export default App;
