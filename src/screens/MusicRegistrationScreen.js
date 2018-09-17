import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import Input from "../components/Input";
import { Container, Button, Content, Header } from "native-base";

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
    }
});

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
        const { name, artist, genre } = this.state;
        const { navigation } = this.props;
        return (
            <Container style={styles.container}>
                <Content padder>
                    <Header transparent/>
                    <Text style={styles.title}>Nova música</Text>
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
                </Content>
                <Footer navigation={navigation} />
            </Container>
        );
    }
}
