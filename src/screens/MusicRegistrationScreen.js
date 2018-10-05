import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Card from '../components/Card'
import CardSection from '../components/CardSection'
import Input from '../components/Input'
import {
  Container,
  Button,
  List,
  ListItem,
  Header,
  Content,
  Item,
  Picker,
  Icon,
  CheckBox,
  Body,
} from 'native-base'
import DebouncedInputComponent from '../components/DebouncedInput'
import genres from '../jsons/genres.json'

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        margin: 10,
        fontWeight: 'bold'
    },
    buttonStyle: {
        backgroundColor: "rgb(72,186,196)",
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        marginLeft: '1%',
        width: '98%',
        justifyContent: 'center', 
        alignItems: 'center'
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
    },
    notFoundText: {
        color: 'blue',
        marginLeft: '50%'
    }
});


// const instruments = [
//     'Piano', 'Teclado', 'Guitarra',
//     'Violão', 'Baixo', 'Violoncelo',
//     'Clarinete', 'Bateria', 'Flauta',
//     'Harpa', 'Saxofone', 'Trompete',
//     'Violino', 'Cavaquinho', 'Sanfona' ];

const CIFRACLUB_API_URL = 'https://a2db36cb.ngrok.io';

export default class MusicRegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            songsList: null,
            selectedSong: undefined,
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
        let url = CIFRACLUB_API_URL + '/songs?name=' + search;

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((searchResult) => {
                this.setState({searchResult});

                this.state.songsList = (<List dataArray={this.state.searchResult}
                                                renderRow={(song) => 
                                                    this.renderListItem(song)
                                                
                                        }>
                                        </List>);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderPickerItems(list) {
        return ( list.map((genre, i) => { 
                return (<Picker.Item key={i} label={genre} value={genre} />);
            })
        );
    }

    onGenreSelected(selectedGenre) {
        this.setState({selectedGenre});
    }

    onHarmonicSelect() {
        this.setState({harmonic: !this.state.harmonic});
    }

    onMelodicSelect() {
        this.setState({melodic: !this.state.melodic});
    }

    selectSong(selectedSong) {
        this.setState({ hideInputs: true });
        this.setState({ selectedSong });
    }

    renderListItem(song) {
        return (
        <ListItem key={song.name} noIndent style={{ backgroundColor: "#cde1f9" }}>
            <TouchableOpacity onPress={() => this.selectSong.bind(this)(song)}>
                <Text>{song.artist.name + ' - ' + song.name}</Text>
            </TouchableOpacity>
        </ListItem>
        );
    }

    render() {
        const { searchResult, hideInputs, name, artist, 
            selectedGenre, search, melodic, harmonic, selectedSong, songsList } = this.state;
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
                                    <List dataArray={this.state.searchResult}
                                            renderRow={(song) =>
                                                this.renderListItem.bind(this)(song) 
                                    }>
                                    </List>
                                </CardSection>

                                <CardSection>
                                    <TouchableOpacity onPress={() => this.setState({ hideInputs: false})}>
                                        <Text style={styles.notFoundText}>Não encontrei!!</Text>
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
                        </Card>
                    )}

                    <Button
                        block
                        iconLeft
                        style={styles.buttonStyle}
                        onPress={ () => this.saveInfo() }>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </Button>
                </Content>
                
            </Container>
        );
    }
}
