import React, { Component } from 'react'
import { Text, StyleSheet, DatePickerIOS } from 'react-native'
import { Form, Container, Content, Item, Label, Input, Button } from 'native-base'
import stylesd from '../stylesd'
import * as firebase from 'firebase'
import DatePicker from 'react-native-datepicker'

require('firebase/firestore')

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginLeft: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  container: {
    backgroundColor: stylesd.corDeFundo
  },
  subcontainer: {
    marginTop: 30
  },
  form: {
    alignItems: 'center'
  },
  bgOurBlue: {
    backgroundColor: stylesd.segundaCor,
  },
  buttonStyle: {
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 50,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
})


class SectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { section:{}, valid: false, editMode:false };
  }

  componentDidMount() {
    if(this.props.navigation.state.params) {
      let section = this.props.navigation.state.params.section;
      this.setState({ section, editMode:true }, ()=>this.validateUser());
      
    }
  }

  onChangeSection = (name, value) => {
    this.setState({section: {...this.state.section, [name]: value} }, () => this.validateUser());
  }

  // Enhacement: Verify which one of the erros and send a proper message
  validateUser = () => {
    const { name,date } = this.state.section;
    let isValid = true
    // Removing location's validation because @caiofelipeam is still fixing it
    // (it's not returning correctly)
    if (!name || !date || new Date() > date) isValid = false
    else {
      if (name < 3) isValid = false
    }
    this.setState({ valid: isValid })
  }

  async updateSection() {
    const section = this.state.section;
    this.setState({ valid: false });
    const db = firebase.firestore()
    const docSection = db.collection('sections').doc(section.id);
    docSection.update(section).then((something)=>{
      console.log(something);
      this.props.navigation.state.params.retrieveUserSections;
      this.props.navigation.goBack();
    });
    
  }
    

  async saveSection() {
    const { name,date } = this.state.section;
    this.setState({ valid: false });
    let newSection = { name, date, isActive: true,  songs:[]};
    firebase.auth().onAuthStateChanged( async currentUser => {
      newSection.uid = currentUser.uid;
      await firebase
          .firestore()
          .collection('sections')        
          .add(newSection)
      this.props.navigation.goBack()
    })
  }

  render() {
    const { valid, editMode } = this.state;
    const { name,date } =  this.state.section;
    return (
      <Container style={styles.container}>
        <Content padder style={styles.subcontainer}>
          <Form style={ styles.form}>
            { editMode ? (
              <Text style={styles.title}>{name}</Text>
            ) : (<Text style={styles.title}>Criar seção</Text>
            )}
            <Item floatingLabel>
              <Label style={ styles.label }>Nome da seção</Label>
              <Input
                onChangeText={name => this.onChangeSection("name",name)}
                value={name}/>
            </Item>
            <DatePicker
              style={{width: 200}}
              date={date}
              mode="date"
              placeholder="Selecione uma data"
              format="YYYY-MM-DD"
              minDate="2018-11-28"
              maxDate="2019-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  marginTop: 25
                },
                dateInput: {
                  marginLeft: 36,
                  marginTop: 50
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) =>  this.onChangeSection("date",date)}
            />
          </Form>
          {editMode ?  (
            <Button
            block
            iconLeft
            style={[styles.buttonStyle, valid && styles.bgOurBlue]}
            disabled={!valid}
              onPress={() => this.updateSection()}
        >
        <Text style={styles.buttonText}>Atualizar</Text>
        </Button>
          ) : (
            <Button
            block
            iconLeft
            style={[styles.buttonStyle, valid && styles.bgOurBlue]}
            disabled={!valid}
              onPress={() => this.saveSection()}
        >
        <Text style={styles.buttonText}>Salvar</Text>
        </Button>
          )}
        </Content>
      </Container>
    )
  }
}

export default SectionScreen
