import React from "react";
import * as firebase from "firebase";

import "./ReactotronConfig";
import { MainNavigator } from "./src/navigators";
import { LoadingConsumer, LoadingProvider } from './src/components/contexts/LoadingContext';
import Loading from './src/components/Loading'

class App extends React.Component {
    

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    const firebaseConfig = {
      apiKey: "AIzaSyBUg1w5wWR2DttpKi5WKC3MTftqqlVbKZs",
      authDomain: "tupm-app.firebaseapp.com",
      databaseURL: "https://tupm-app.firebaseio.com",
      projectId: "tupm-app",
      storageBucket: "tupm-app.appspot.com",
      messagingSenderId: "558789255926"
    };
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return(
      <LoadingProvider>
        <MainNavigator />
        <Loading/>
      </LoadingProvider>
    );
  }
}

export default App