import React, { createContext } from "react";
import * as firebase from "firebase";
import { Root } from "native-base";

import "./ReactotronConfig";
import { MainNavigator } from "./src/navigators";
import { LoadingContext } from './src/components/contexts';
import Loading from "./src/components/Loading";

class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: false, loadingInicial: true };
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

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loadingInicial: false })
  }

  showLoading = () => this.setState({ loading: true })
  hideLoading = () => this.setState({ loading: false })

  render() {
    const { loading, loadingInicial } = this.state;
    const { showLoading, hideLoading } = this;

    // loading aparecendo pra mais de uma pagina
    return(
      <LoadingContext.Provider value={ { loading, showLoading, hideLoading } }>
        <Root>
          <MainNavigator />
          <Loading loading={loadingInicial} />
        </Root>
      </LoadingContext.Provider>
    );
  }
}

export default App