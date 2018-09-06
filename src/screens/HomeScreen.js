import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container, Content, Header, Icon, Input, Item } from "native-base";

import User from "../components/User";
import Footer from "../components/Footer";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 0,
          nome: "Henry Greene",
          imagem:
            "https://www.revistaplaneta.com.br/wp-content/uploads/sites/3/2017/05/15_pl530_pessoa.jpg",
          instrumento: "Bateria",
          musicas: [],
          premium: true
        },
        {
          id: 1,
          nome: "Lina Garner",
          imagem: "",
          instrumento: "Cantora",
          musicas: [],
          premium: false
        },
        {
          id: 3,
          nome: "Theresa Bridges",
          imagem:
            "https://meapaixonei.com.br/wp-content/uploads/2017/10/sinais-que-comprovam-que-voce-tem-se-tornado-uma-pessoa-melhor-a-cada-dia.jpg",
          instrumento: "Cantora/Guitarra",
          musicas: [],
          premium: false
        },
        {
          id: 4,
          nome: "Ann Hampton",
          imagem: "",
          instrumento: "Guitarra",
          musicas: [],
          premium: true
        },
        {
          id: 5,
          nome: "Mary Fox",
          imagem: "",
          instrumento: "Baixo",
          musicas: [],
          premium: false
        },
        {
          id: 6,
          nome: "Evelyn Franklin",
          imagem: "",
          instrumento: "Percussão",
          musicas: [],
          premium: false
        },
        {
          id: 7,
          nome: "Luciano Júnior",
          imagem: "",
          instrumento: "Violão",
          musicas: [
            {
              musica: "Muito pra te dar",
              banda: "Magnificos",
              ritmo: "Forró"
            },
            {
              musica: "Disritmia",
              banda: "Cartola",
              ritmo: "Samba"
            },
            {
              musica: "Mudar pra quê",
              banda: "Os Nonatos",
              ritmo: "Sertanejo"
            },
            {
              musica: "Coração",
              banda: "Dorgival Dantas",
              ritmo: "Forró"
            },
            {
              musica: "Nota Dez",
              banda: "Xand Avião",
              ritmo: "Forró"
            },
            {
              musica: "Yellow",
              banda: "Coldplay",
              ritmo: "Rock"
            },
            {
              musica: "Chorando Se Foi",
              banda: "Calypson",
              ritmo: "Lambada"
            },
            {
              musica: "Mama",
              banda: "Waleska Popozuda",
              ritmo: "Funk"
            }
          ],
          premium: true
        }
      ],
      busca: ""
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded transparent>
          <Item style={styles.itemInput}>
            <Icon name="search" />
            <Input
              placeholder="busca por nome e/ou instrumento"
              value={this.state.busca}
              onChangeText={busca => this.setState({ busca })}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="name-phone-pad"
              // underlineColorAndroid='transparent'
            />
          </Item>
        </Header>

        <Content contentContainerStyle={styles.content}>
          {this.state.users
            .filter(
              value =>
                value.nome
                  .toLowerCase()
                  .includes(this.state.busca.toLowerCase()) ||
                value.instrumento
                  .toLowerCase()
                  .includes(this.state.busca.toLowerCase())
            )
            .map(user => (
              <User
                key={user.id}
                user={user}
                navigation={this.props.navigation}
              />
            ))}
        </Content>
        <Footer navigation={this.props.navigation} />
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
