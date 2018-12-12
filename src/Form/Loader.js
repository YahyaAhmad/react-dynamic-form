import React, { Component } from 'react'
import './loader.css';

export default class Loader extends Component {
  render() {
    let {color,isLoading} = this.props;
    return (
        <div className={"lds-ring" + (isLoading?' loading':'')} style={{borderColor:`${color} transparent transparent transparent`}}><div></div><div></div><div></div><div></div></div>
    )
  }
}
