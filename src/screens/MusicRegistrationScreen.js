import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import Card from "../components/Card";
import CardSection from "../components/CardSection";
import Input from "../components/Input";
import { Container, Button, List, ListItem, Header, Content, Item } from "native-base";
import DebouncedInputComponent from "../components/DebouncedInput";

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
    inputSearch: {
        textAlign: "center",
        fontSize: 16
    },
    itemSearch: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginVertical: 10,
        flex: 1
    },
    showInputs: {
        textAlign: "center",
        alignItems: 'center',
        fontSize: 16
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
            hideInputs: true,
            search: "",
            name: "",
            artist: "",
            genre: ""
        };
    }

    saveInfo() {
        console.log(this.state);
    }

    searchSong(search) {
        this.setState({ search });
    }

    render() {
        const { hideInputs, name, artist, genre, search } = this.state;
        const { navigation } = this.props;
        return (
            <Container style={styles.container}>
                <Content padder>
                    <Header transparent/>
                    <Text style={styles.title}>Nova música</Text>
                    <Item style={styles.itemSearch}>
                        <DebouncedInputComponent
                            updateText={this.searchSong.bind(this)}
                            placeholder="busca por música"
                            style={styles.inputSearch}
                        />
                    </Item>
                    <Card>
                        { search == '' ? null : (
                            <View>
                                <CardSection>
                                    <List dataArray={['Item 1','Item 2','Item 3!']}
                                          renderRow={(item) =>
                                        <ListItem>
                                            <Text>{item}</Text>
                                        </ListItem>
                                    }>
                                    </List>
                                </CardSection>

                                <CardSection>
                                    <TouchableOpacity onPress={() => this.setState({ hideInputs: false})}>
                                        <Text style={{color: 'blue'}}>Não encontrei</Text>
                                    </TouchableOpacity>
                                </CardSection>
                            </View>
                        )}
                    </Card>

                    { hideInputs ? null : (
                        <Card>
                            <CardSection>
                                <Input
                                    label="Nome"
                                    placeholder="Digite o nome da música"
                                    onChangeText={ name => this.setState({name}) }
                                    value={name}
                                />
                            </CardSection>

                            <CardSection>
                                <Input
                                    label="Artista"
                                    placeholder="Digite o nome do artista"
                                    onChangeText={ artist => this.setState({artist}) }
                                    value={artist}
                                />
                            </CardSection>

                            <CardSection>
                                <Input
                                    label="Gênero"
                                    placeholder="Digite o gênero"
                                    onChangeText={ genre => this.setState({genre}) }
                                    value={genre}
                                />
                            </CardSection>

                            <CardSection>
                                <Button
                                    block
                                    iconLeft
                                    style={styles.buttonStyle}
                                    onPress={ () => this.saveInfo() }>
                                    <Text style={styles.buttonText}>Adicionar</Text>
                                </Button>
                            </CardSection>
                        </Card>
                    )}

                </Content>
            </Container>
        );
    }
}
