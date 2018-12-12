import React, { Component } from 'react'
import Axios from 'axios';
import Loader from './Loader';

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
            isLoading: false,
            fieldInput: {},
        }
        this.inputChange = this.inputChange.bind(this);
        this.formRender = this.formRender.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
    }



    inputChange(name, value) {
        let fieldInput = this.state.fieldInput;
        fieldInput[name] = value;
        this.setState({fieldInput:fieldInput}, () => {
            this.props.onChange(this.state.fieldInput);
        });
    }

    formRender(field, key) {
        let renderedField;
        if (!field.type) {
            return <div className={key + '-dynamic-group react-form-builder-group'}>{this.fieldsMap(field)}</div>
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
        this.showLoader();
        Axios.post(postApi, this.state.fieldInput).then(() => {
            this.hideLoader();
        })
    }

    showLoader(){
        this.setState({
            isLoading: true,
        })
    }

    hideLoader(){
        this.setState({
            isLoading: false,
        })
    }

    componentWillMount() {

        let fieldInput = this.initializeFieldsState(this.props.fields)
        this.setState({fieldInput:fieldInput});
        this.options = Object.assign(defaultOptions, this.props.options)
    }

    initializeFieldsState(fields) {
        let fieldInput = {};
        Object.keys(fields).map(key => {
            if (fields[key].type) {
                fieldInput[key] = '';
            } else {
                Object.assign(fieldInput, this.initializeFieldsState(fields[key]));
            }

        })
        return fieldInput;
    }

    renderClearBtn() {
        if (this.options.showClearBtn) {
            return <button type='reset'>{this.options.clearLabel}</button>
        }
    }

    fieldsMap(fields) {
        return Object.keys(fields).map(key => {
            return this.formRender(fields[key], key);
        })
    }

    renderLoading(){
        const {loader,loaderColor} = this.props.options;
        if(loader){
            return <Loader isLoading={this.state.isLoading} color={loaderColor}/>;
        } else {
            return "";
        }
    }

    render() {

        let { fields } = this.props;
        let renderedFields;
        renderedFields = this.fieldsMap(fields);
        return (
            <form className='react-form-builder'>
                <div>{this.options.formTitle}</div>
                {renderedFields}
                <div class="react-form-tools">
                    <button onClick={this.submitForm}>{this.options.submitLabel}</button>
                    {this.renderClearBtn()}
                    {this.renderLoading()}
                </div>

            </form>
        )
    }
}

let FormRender = {
    renderText: (name, field, inputFun) => {
        return (
            <div class={name + "-input-wrapper"}>
                {FormRender.renderLabel(name, field.label)}
                <input {...field.options.inputProps} onChange={(event) => inputFun(name, event.target.value)} type='text' />
            </div>
        );
    },
    renderTextArea: (name, field, inputFun) => {
        return (
            <div class={name + "-input-wrapper"}>
                {FormRender.renderLabel(name, field.label)}
                <textarea onChange={(event) => inputFun(name, event.target.value)}></textarea>
            </div>
        );
    },
    renderLabel: (name, label) => {
        if (label)
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

export function Field(type) {
    this.label = '';
    this.type  = type;
    this.options = {
        inputProps: {
            placeholder: ''
        }
    }
    this.setPlaceholder = (text) => {
        this.options.inputProps.placeholder = text;
        let newField = new Field()
        newField = this;
        return newField
    }

    this.setLabel = (label) => {
        this.label = label;
        let newField = new Field()
        newField = this;
        return newField
    }

    this.getType = () => {
        return this.type;
    }
}

let text = new Field();

export let Fields = {

    createText: (label) => {
    
        let fieldObject = new Field('text');
        fieldObject.setLabel(label);
        return fieldObject;

    },
    createTextArea: (label) => {
        let textObject = {
            label: label,
            type: 'textarea',
        }

        return textObject;

    }
}