import React from "react";
import * as firebase from "firebase";

import { MainNavigator } from "./src/navigators";
import "./ReactotronConfig";
import { Spinner, Root } from "native-base";

export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
  
  constructor(props) {
    super(props);
    this.state = { loading: true };
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
    if (this.state.loading) {
        return (
            <Root>
                <Spinner />
            </Root>
        );
    }
    return (
        <Root>
            <MainNavigator />
        </Root>
    );
  }
}
