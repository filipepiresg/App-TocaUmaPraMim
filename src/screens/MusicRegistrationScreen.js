import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import Input from "../components/Input";
import { Container, Button, List, ListItem, Header, Content, Item, Picker, Icon, CheckBox, Body } from "native-base";
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
    },
    labelStyle: {
		fontSize: 18,
        paddingLeft: 25,
        paddingRight: 53,
        paddingTop: 7
    },
    checkBoxStyle: {
        marginRight: 5, 
        marginLeft: 20, 
        marginTop: 10, 
        marginBottom: 10
    }
});

// const instruments = [
//     'Piano', 'Teclado', 'Guitarra',
//     'Violão', 'Baixo', 'Violoncelo',
//     'Clarinete', 'Bateria', 'Flauta',
//     'Harpa', 'Saxofone', 'Trompete',
//     'Violino', 'Cavaquinho', 'Sanfona' ];

const genres = [
'Alternativo','Axé','Blues','Bolero','Bossa Nova','Brega','Clássico',
'Country','Cuarteto','Cumbia','Dance','Disco','Eletrônica',
'Emocore','Fado','Folk','Forró','Funk','Funk Internacional',
'Gospel/Religioso','Grunge','Guarânia','Gótico','Hard Rock',
'Hardcore','Heavy Metal','Hip Hop/Rap','House','Indie','Industrial',
'Infantil','Instrumental','J-Pop/J-Rock','Jazz','Jovem Guarda',
'K-Pop/K-Rock','MPB','Mambo','Marchas/Hinos','Mariachi',
'Merengue','Música andina','New Age','New Wave','Pagode',
'Pop','Pop Rock','Post-Rock','Power-Pop','Psicodelia','Punk Rock',
'R&B','Ranchera','Reggae','Reggaeton','Regional','Rock',
'Rock Progressivo','Rock and Roll','Rockabilly','Romântico',
'Salsa','Samba','Samba Enredo','Sertanejo','Ska','Soft Rock',
'Soul','Surf Music','Tango','Tecnopop','Trova','Velha Guarda',
'World Music','Zamba','Zouk'];

export default class MusicRegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideInputs: true,
            search: "",
            name: "",
            artist: "",
            selectedGenre: "",
            melodic: false,
            harmonic: false 
        };
    }

    saveInfo() {
        console.log(this.state);
    }

    searchSong(search) {
        this.setState({ search });
    }

    renderPickerItems(list) {
        return ( list.map(genre => { 
                return (<Picker.Item label={genre} value={genre} />);
            })
        );
    }

    onGenreSelected(selectedGenre) {
        this.setState({selectedGenre});
    }

    onHarmonicSelect() {
        console.log(this.state);
        this.setState({harmonic: !this.state.harmonic});
        console.log(this.state);
    }

    onMelodicSelect() {
        console.log(this.state);
        this.setState({melodic: !this.state.melodic});
        console.log(this.state);
    }

    render() {
        const { hideInputs, name, artist, selectedGenre, search, melodic, harmonic } = this.state;
        const { navigation } = this.props;
        return (
            <Container style={styles.container}>
                <Content padder>
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
                                        <Text style={{color: 'blue'}}>Não encontrei!!</Text>
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
                                    placeholder="Digite o nome do artistaA"
                                    onChangeText={ artist => this.setState({artist}) }
                                    value={artist}
                                />
                            </CardSection>
                            
                            <CardSection>
                                <Text style={styles.labelStyle}>Gênero</Text>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{backgroundColor: '#FFFFFF', marginTop: -6, marginBottom: -5 }}
                                    placeholder="Selecione um gênero"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={selectedGenre}
                                    onValueChange={this.onGenreSelected.bind(this)}
                                >
                                    { this.renderPickerItems(genres) }
                                </Picker>
                            </CardSection>

                            <CardSection>
                                <CheckBox checked={melodic}  
                                        style={styles.checkBoxStyle}
                                        onPress={this.onMelodicSelect.bind(this)}/>
                                <Body><Text>Melódico</Text></Body>
                                <CheckBox checked={harmonic} 
                                        style={styles.checkBoxStyle}
                                        onPress={this.onHarmonicSelect.bind(this)}/>
                                <Body><Text>Harmonico</Text></Body>
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
