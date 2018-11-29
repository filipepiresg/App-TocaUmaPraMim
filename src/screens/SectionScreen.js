import React, { Component } from 'react'
import { Text, StyleSheet, DatePickerIOS } from 'react-native'
import { Form, Container, Content, Item, Label, Input, Button } from 'native-base'
import stylesd from '../stylesd'
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
    this.state = { name:'', date: null, valid: false };
  }

  updateSection = (name, value) => {
    this.setState({ [name]: value }, () => this.validateUser())
  }

  // Enhacement: Verify which one of the erros and send a proper message
  validateUser = () => {
    const { name,date } = this.state
    let isValid = true
    // Removing location's validation because @caiofelipeam is still fixing it
    // (it's not returning correctly)
    if (!name || !date || new Date() > date) isValid = false
    else {
      if (name < 3) isValid = false
    }
    this.setState({ valid: isValid })
  }

  saveSection() {
    console.log("Salvar secao aqui.");
  }

  render() {
    const {name,date, valid} = this.state;
    return (
      <Container style={styles.container}>
        <Content padder style={styles.subcontainer}>
          <Form style={ styles.form}>
            <Text style={styles.title}>Criar seção</Text>
            <Item floatingLabel>
              <Label style={ styles.label }>Nome da seção</Label>
              <Input
                onChangeText={name => this.updateSection("name",name)}
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
              onDateChange={(date) =>  this.updateSection("date",date)}
            />
          </Form>
          <Button
              block
              iconLeft
              style={[styles.buttonStyle, valid && styles.bgOurBlue]}
              disabled={!valid}
                onPress={() => this.saveSection()}
          >
          <Text style={styles.buttonText}>Salvar</Text>
          
          </Button>
        </Content>
      </Container>
    )
  }
}

export default SectionScreen
