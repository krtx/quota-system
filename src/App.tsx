import firebase from 'firebase/app';
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

class App extends Component {
  render() {
    (new Database).getTasks();

    return (
      <div>
        <AppHeader />
        <TaskCardList />
      </div>
    );
  }
}

export default App;
