import React, { Component } from 'react'
import Axios from 'axios';

const defaultOptions = {
    postApi: '',
    submitLabel: 'Submit',
    clearLabel: 'Clear',
    showClearBtn: false,
}




export class Form extends Component {

    constructor() {
        super()
        this.state = {
        }
        this.inputChange = this.inputChange.bind(this);
        this.formRender = this.formRender.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }



    inputChange(name, value) {
        let state = {};
        state[name] = value;
        this.setState(state, () => {
            this.props.onChange(this.state);
        });
    }

    formRender(field,key) {
        let renderedField;
        if(!field.type) {
            return <div className={key + '-dynamic-group'}>{this.fieldsMap(field)}</div>
        }
        switch (field.type) {
            case 'text':
                renderedField = FormRender.renderText(key, field, this.inputChange);
                break;
            case 'textarea':
                renderedField = FormRender.renderTextArea(key, field, this.inputChange);
                break;
        }
        return renderedField;
    }

    submitForm(event) {
        event.preventDefault()
        let postApi = this.props.options.postApi;
        Axios.post(postApi, this.state)
    }

    componentWillMount() {
        
        let state = this.initializeFieldsState(this.props.fields)
        this.setState(state);
        this.options = Object.assign(defaultOptions,this.props.options)
    }

    initializeFieldsState(fields){
        let state = {};
        Object.keys(fields).map(key => {
            if(fields[key].type){
                state[key] = '';
            } else {
                Object.assign(state,this.initializeFieldsState(fields[key]));
            }
                
        })
        return state;
    }

    renderClearBtn(){
        if(this.options.showClearBtn){
            return <button type='reset'>{this.options.clearLabel}</button>
        }
    }

    fieldsMap(fields){
        return Object.keys(fields).map(key => {
            return this.formRender(fields[key],key);
        })
    }

    render() {

        let { fields } = this.props;
        let renderedFields;
        renderedFields = this.fieldsMap(fields);
        return (
            <form>
                <div>{this.options.formTitle}</div>
                {renderedFields}
                <button onClick={this.submitForm}>{this.options.submitLabel}</button>
                {this.renderClearBtn()}

            </form>
        )
    }
}

let FormRender = {
    renderText: (name,field, inputFun) => {
        return (
            <div class={name + "-input-wrapper"}>
                {FormRender.renderLabel(name,field.label)}
                <input {...field.options.inputProps} onChange={(event) => inputFun(name, event.target.value)} type='text' />
            </div>
        );
    },
    renderTextArea: (name,field, inputFun) => {
        return (
            <div class={name + "-input-wrapper"}>
                {FormRender.renderLabel(name,field.label)}
                <textarea onChange={(event) => inputFun(name, event.target.value)}></textarea>
            </div>
        );
    },
    renderLabel: (name,label) => {
    if(label)
        return <label className={`${name}-input-label`}>{FormRender.formatLabel(label)}</label>
    },
    formatLabel: (text) => {
        if (text[text.length - 1] == ':') {
            return text;
        } else {
            return text + ':';
        }
    }


} 

export let Fields = {
    defaultTextOptions: {
        label: '',
        placeHolder: '',
    },
    createText: (label,placeholder,options) => {
        let propTextObject = {
            label: label,
            type: 'text',
            placeholder: placeholder,
            options: {
                inputProps: {
                    placeholder: placeholder
                }
            },
            ...options
        }
        let textObject = Object.assign({},Fields.defaultTextOptions, propTextObject);
        return textObject;

    },
    createTextArea: (label) => {
        let textObject = {
            label: label,
            type: 'textarea',
        }

        return textObject;

    }
}