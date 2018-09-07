import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Header, Icon, Input, Item } from "native-base";

import User from "../components/User";
import Footer from "../components/Footer";

const usersCreated = [
  {
    id: 0,
    name: "Henry Greene",
    imgProfile:
      "https://www.revistaplaneta.com.br/wp-content/uploads/sites/3/2017/05/15_pl530_pessoa.jpg",
    instrument: "Bateria",
    inventory: [],
    premium: true
  },
  {
    id: 1,
    name: "Lina Garner",
    imgProfile: "",
    instrument: "Cantora",
    inventory: [],
    premium: false
  },
  {
    id: 3,
    name: "Theresa Bridges",
    imgProfile:
      "https://meapaixonei.com.br/wp-content/uploads/2017/10/sinais-que-comprovam-que-voce-tem-se-tornado-uma-pessoa-melhor-a-cada-dia.jpg",
    instrument: "Cantora/Guitarra",
    inventory: [],
    premium: false
  },
  {
    id: 4,
    name: "Ann Hampton",
    imgProfile: "",
    instrument: "Guitarra",
    inventory: [],
    premium: true
  },
  {
    id: 5,
    name: "Mary Fox",
    imgProfile: "",
    instrument: "Baixo",
    inventory: [],
    premium: false
  },
  {
    id: 6,
    name: "Evelyn Franklin",
    imgProfile: "",
    instrument: "Percussão",
    inventory: [],
    premium: false
  },
  {
    id: 7,
    name: "Luciano Júnior",
    imgProfile: "",
    instrument: "Violão",
    inventory: [
      {
        music: "Muito pra te dar",
        group: "Magnificos",
        ritmo: "Forró"
      },
      {
        music: "Disritmia",
        group: "Cartola",
        ritmo: "Samba"
      },
      {
        music: "Mudar pra quê",
        group: "Os Nonatos",
        ritmo: "Sertanejo"
      },
      {
        music: "Coração",
        group: "Dorgival Dantas",
        ritmo: "Forró"
      },
      {
        music: "Nota Dez",
        group: "Xand Avião",
        ritmo: "Forró"
      },
      {
        music: "Yellow",
        group: "Coldplay",
        ritmo: "Rock"
      },
      {
        music: "Chorando Se Foi",
        group: "Calypson",
        ritmo: "Lambada"
      },
      {
        music: "Mama",
        group: "Waleska Popozuda",
        ritmo: "Funk"
      }
    ],
    premium: true
  }
];

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: usersCreated,
      search: ""
    };
  }

  render() {
    const { search, users } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header searchBar rounded transparent>
          <Item style={styles.itemInput}>
            <Icon name="search" />
            <Input
              placeholder="busca por nome e/ou instrumento"
              value={search}
              onChangeText={search => this.setState({ search })}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="name-phone-pad"
              // underlineColorAndroid='transparent'
            />
          </Item>
        </Header>

        <Content contentContainerStyle={styles.content}>
          {users
            .filter(
              value =>
                value.name.toLowerCase().includes(search.toLowerCase()) ||
                value.instrument.toLowerCase().includes(search.toLowerCase())
            )
            .map(user => (
              <User key={user.id} user={user} back navigation={navigation} />
            ))}
        </Content>
        <Footer navigation={navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,239,215)"
  },
  itemInput: {
    backgroundColor: "#fff"
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
