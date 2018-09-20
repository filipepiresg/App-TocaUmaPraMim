import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import Footer from "../components/Footer";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import Input from "../components/Input";
import { Container, Button, Content, Header } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        margin: 10,
        fontWeight: 'bold'
    },
    buttonStyle: {
        backgroundColor: "rgb(72,186,196)",
        marginBottom: 10,
        borderRadius: 10,
        width: '100%'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    container: {
        backgroundColor: "rgb(255,239,215)"
    },
    dropdownContainerStyle: {
		justifyContent: 'flex-start',
        flexDirection: 'row',
        flex:1
    },
    dropdownStyle: {
        flex:1,
        width: "50%"
    }
});

// TODO: Refact to Song
// How song shoud be?
/**
 * '0aa12sed552sfirebaseId' : {
 *    name: 'Verdadeiro Amor',
 *    artist: 'Magníficos',
 *    genre: 'Forró', // I think it doesnt need to reference another object
 *    instrument: 'Violão' // This may be adequate to reference another object, but depends on if we are gonna use firestore
 *    info: 'Geralmente tocada em F \n Outra linha',
 *    cifraClub: {
 *          songSlug: 'verdadeiro-amor', 
 *          artistSlug: 'magnificos'
 *      } // undefined if it was not chosen from the CifraClub list
 * }
 */
export default class MusicRegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            artist: "",
            genre: ""
        };
    }

    saveInfo() {
        console.log(this.state);
    }

    render() {
        const { name, username , state, city } = this.state;
        const { navigation } = this.props;
        let estados = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];
          let cidades = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];
        return (
            <Container style={styles.container}>
                <Content padder>
                    <Header transparent/>
                    <Text style={styles.title}>Só mais um pouco...</Text>
                    <Card>
                        <CardSection>
                            <Input
                                label="Nome"
                                placeholder="Digite seu nome"
                                onChangeText={ name => this.setState({name}) }
                                value={name}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Nome de usuário"
                                placeholder="ex: fuluano69"
                                onChangeText={ username => this.setState({username}) }
                                value={username}
                            />
                        </CardSection>
                        <View style={styles.dropdownContainerStyle}>
                            <Dropdown
                                    label='Estado'
                                    data={estados}
                                    style={styles.dropdownStyle}
                            />
                            <Dropdown
                                    label='Cidade'
                                    data={cidades}
                                    style={styles.dropdownStyle}
                            />
                        </View>
                        <CardSection>
                            <Button
                                block
                                iconLeft
                                style={styles.buttonStyle}
                                onPress={ () => this.saveInfo() }>
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </Button>
                        </CardSection>
                    </Card>
                </Content>
            </Container>
        );
    }
}


