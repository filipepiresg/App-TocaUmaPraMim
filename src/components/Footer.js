import React from "react";

import { Footer, FooterTab, Button, Icon } from "native-base";

// import styles from './styles';

const Footers = ({ navigation }) => (
  <Footer style={{ backgroundColor: "rgb(72,186,196)" }}>
    <FooterTab>
      <Button full onPress={() => navigation.navigate("Explore")}>
        <Icon type="FontAwesome" name="home" style={{ color: "#FFF" }} />
      </Button>
    </FooterTab>
    <FooterTab>
      <Button full onPress={() => navigation.navigate("Explore")}>
        <Icon type="FontAwesome" name="globe" style={{ color: "#FFF" }} />
      </Button>
    </FooterTab>
    <FooterTab>
      <Button full onPress={() => navigation.push("Profile")}>
        <Icon type="FontAwesome" name="user" style={{ color: "#FFF" }} />
      </Button>
    </FooterTab>
    <FooterTab>
      <Button full onPress={() => navigation.navigate("Login")}>
        <Icon type="FontAwesome" name="wrench" style={{ color: "#FFF" }} />
      </Button>
    </FooterTab>
  </Footer>
);

export default Footers;
