import React, { Component } from 'react';
import './main.css';
import {Form,Fields} from 'react-fast-forms'


const formFields = {

  name: Fields.createText('Full Name')
              .setPlaceholder('soso'),
  age: Fields.createText('Age'),
  email: Fields.createText('Email'),
  description: Fields.createTextArea("Description"),
  fullName: {
    first: Fields.createText('First'),
    second: Fields.createText('Second'),
  },
  date:{
    from: Fields.createText('From'),
    to: Fields.createText('To'),
  },
  threeValues:{
    value1: Fields.createText(null).setPlaceholder('Enter a value'),
    value2: Fields.createText(null).setPlaceholder('Enter a value'),
    details: Fields.createText(null).setPlaceholder('What are your thoughts?'),
  },
  ssn: Fields.createText('Social Security Number').setPlaceholder('Enter Please.'),
}
const options = {
  postApi: 'https://reqres.in/api/users',
  showClearBtn: false,
  loader: true,
  loaderColor: 'rgb(160, 97, 243)',
}

class App extends Component {
  componentDidMount(){

  }

  render() {
    return (
      <div className="App">
        <Form fields={formFields} onChange={ state => console.log(state)} options={options}/>
      </div>
    );
  }
}

export default App;
