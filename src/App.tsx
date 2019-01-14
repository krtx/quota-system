import firebase from 'firebase/app';
import 'firebase/auth';
import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import TaskCardList from './components/TaskCardList';
import Database from './libs/Database';

// initialize app
const config = {
  apiKey: "AIzaSyAKNGlIwnxtRuCkn_80A6vdN_IgDJiS9Ak",
  authDomain: "quota-system.firebaseapp.com",
  databaseURL: "https://quota-system.firebaseio.com",
  projectId: "quota-system",
  storageBucket: "quota-system.appspot.com",
  messagingSenderId: "372908174302"
};
firebase.initializeApp(config);

interface Props { }

interface State {
  user?: firebase.User;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.signIn().then((user) => {
      if (!user) {
        return;
      }

      // create user
      let db = new Database;
      db.addUser(user);

      // set state
      this.setState({ user: user });
    });
  }

  async signIn(): Promise<firebase.User | null> {
    // change auth persistence
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } catch (error) {
      console.log(error);
      return null;
    }

    // check current user
    const user = await this.waitForCurrentUser();
    if (user) {
      return user;
    }

    // get redirect result
    try {
      const result = await firebase.auth().getRedirectResult();
      if (result.user) {
        return result.user;
      } else {
        // not recdirect access
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      }
    } catch (error) {
      console.log(error);
      return null;
    }

    return null;
  }

  waitForCurrentUser() {
    return new Promise<firebase.User | null>((resolve, reject) => {
      // if found return immediately
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        resolve(currentUser);
        return;
      }

      // wait for state changes
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
        return;
      });
    });
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <AppHeader userName={this.state.user.email || ''} />
          <TaskCardList user={this.state.user} />
        </div>
      );
    } else {
      return (
        <div>
          <AppHeader userName="" />
          <div style={{ marginTop: 10 }}>
            Check Login Status ... (Redirect you to the Google sign in page when you aren't logged in)
          </div>
        </div>
      );
    }
  }
}

export default App;
