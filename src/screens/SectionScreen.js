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
    this.state = { name:'', date: new Date(), valid: false };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({date: newDate})
  }

  saveSection() {
    console.log("Salvar secao aqui.");
  }

  render() {
    const {name,date} = this.state;
    return (
      <Container style={styles.container}>
        <Content padder style={styles.subcontainer}>
          <Form style={ styles.form}>
            <Text style={styles.title}>Criar seção</Text>
            <Item floatingLabel>
              <Label style={ styles.label }>Nome da seção</Label>
              <Input
                onChangeText={name => this.setState({name})}
                value={name}/>
            </Item>
            <DatePicker
              style={{width: 200}}
              date={date}
              mode="date"
              placeholder="Select date"
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
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </Form>
          <Button
              block
              iconLeft
              style={[styles.buttonStyle, styles.bgOurBlue]}
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
