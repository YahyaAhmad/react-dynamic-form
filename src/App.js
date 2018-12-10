import React, { Component } from 'react';
import { Fields, Form, Field } from './Form/DynamicForm';



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
  ssn: Fields.createText('Social Security Number').setPlaceholder('Enter Please.'),
}
const options = {
  postApi: 'https://reqres.in/api/users',
  showClearBtn: false,
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
