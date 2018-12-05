import React, { Component } from 'react';
import { Fields, Form } from './Form/DynamicForm';



const formFields = {

  name: Fields.createText(null, 'SoSo'),
  age: Fields.createText('Age'),
  email: Fields.createText('Email'),
  description: Fields.createTextArea("Description"),
  fullName: {
    first: Fields.createText('First'),
    second: Fields.createText('Second'),
  }
}
const options = {
  postApi: 'https://reqres.in/api/users',
  showClearBtn: true,
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
