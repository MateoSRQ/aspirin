import React from 'react';
import style from './index.module.scss'
import log from 'loglevel';
import validate from 'validate.js';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Select } from 'antd';
import { TreeSelect } from 'antd';

import 'antd/dist/antd.css';
import Item from "../../pages/list/item";

const { Option } = Select;
const { TreeNode } = TreeSelect;

log.setLevel('warn');


interface TreeProps {
    name: string
    [x: string]: any
    data: any
}

interface TreeState {
    value: string[]
    validation: string,
    status: "error" | "success" | "warning" | "validating"
}

class FormTree extends React.Component<TreeProps, TreeState> {
    constructor(props: TreeProps) {
        log.info('Form:Tree:constructor reached');
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            value: this.props.value?this.props.value:[],
            validation: '',
            status: 'validating'
        }
    }

    componentDidMount(): void {
        this.props?.handleRefresh(this.handleBlur);
        this.props?.handleReset(this.handleReset);
    }

    async handleReset() {
        console.log('handle reset');
        await this.setState({
            value: [],
            validation: '',
            status: 'validating'
        });
    }

    async handleChange(e: any, i: any) {
        console.log('hc')
        console.log(e)
        await this.setState({
            value: e
        })
        await this.handleBlur(e);
    }

    async handleBlur(e: any) {
        log.info('Form:Tree:handleBlur reached');
        console.log('xx')
        console.log(this.state.value)
        if (this.props.rules) {

            let result = validate.single(this.state.value, this.props.rules);
            if (result) {
                console.log('a')
                await this.setState({
                    value: this.state.value,
                    validation: result[0],
                    status: 'error'
                });
            }
            else {
                console.log('b')
                await this.setState({
                    value: this.state.value,
                    validation: '',
                    status: 'success'
                });
            }
            //this.props.handleChange(this.props.name, this.state.value, this.state.status)
            return {...this.state, name: this.props.name};
        }
    }

    render() {
        log.info('Form:Tree:render reached');
        let {handleChange,  handleBlur, handleRefresh, handleReset, name, label, value,  ...props} = this.props;

        console.log(this.props.data)

        let treeData: any = []
        for (let node in this.props.data) {


            interface _node {
                title: string
                value: string
                key: string,
                children: any
            };

            let n: _node = {
                title: node.toString(),
                value: node.toString(),
                key: node.toString(),
                children: []
            };


            for (let leaf of this.props.data[node]) {
                n.children.push({
                    title: leaf.nombre,
                    value: leaf.codigo,
                    key: leaf._id
                })
            }
            treeData.push(n);
        }

        console.log(treeData);
        console.log(this.state.value)

        return (
            <div className={[].join(' ')} key={name}>
                <Form.Item
                    validateStatus={this.state.status}
                    extra={this.state.validation}
                    label={this.props.label}
                >
                    <TreeSelect
                        // allowClear
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeCheckable={true}
                        showCheckedStrategy={TreeSelect.SHOW_PARENT}
                        searchPlaceholder={'Seleccionar prestaciones...'}
                        treeData={treeData}
                        value={this.state.value}
                        //name={name}
                        onChange={ (e: any, i: any) => { this.handleChange(e, i) } }
                        onBlur={ this.handleBlur }
                    />
                </Form.Item>
            </div>
        )
    }
}

interface SelectProps {
    name: string
    [x: string]: any
    data: any
}

interface SelectState {
    value?: any
    validation: string,
    status: "error" | "success" | "warning" | "validating"
}

class FormSelect extends React.Component<SelectProps, SelectState> {
    constructor(props: SelectProps) {
        log.info('Form:Select:constructor reached');
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            value: this.props.value?this.props.value:null,
            validation: '',
            status: 'validating'
        }
    }

    componentDidMount(): void {
        this.props?.handleRefresh(this.handleBlur);
        this.props?.handleReset(this.handleReset);
    }

    async handleReset() {
        console.log('handle reset');
        await this.setState({
            value: null,
            validation: '',
            status: 'validating'
        });
    }

    async handleChange(e: any, i: any) {

        await this.setState({
            value: e
        })
    }

    async handleBlur(e: any) {
        log.info('Form:Select:handleBlur reached');

        if (this.props.rules) {

            let result = validate.single(this.state.value, this.props.rules);
            if (result) {
                await this.setState({
                    value: e?e:this.state.value,
                    validation: result[0],
                    status: 'error'
                });
            }
            else {
                await this.setState({
                    value: e?e:this.state.value,
                    validation: '',
                    status: 'success'
                });
            }
            //this.props.handleChange(this.props.name, this.state.value, this.state.status)
            return {...this.state, name: this.props.name};
        }
    }

    render() {
        log.info('Form:Select:render reached');
        let {handleChange,  handleBlur, handleRefresh, handleReset, name, label, value,  ...props} = this.props;

        let children = this.props.data.map((datum: any, index: number) => {
            return <Option key={index} value={datum.value}>{datum.title}</Option>
        })

        return (
            <div className={[].join(' ')} key={name}>
                <Form.Item
                    validateStatus={this.state.status}
                    extra={this.state.validation}
                    label={this.props.label}
                >
                    <Select
                        {...props}
                        value={this.state.value}
                        //name={name}
                        onChange={ (e: any, i: any) => { this.handleChange(e, i) } }
                        onBlur={ this.handleBlur }
                    >
                        {children}
                    </Select>
                </Form.Item>
            </div>
        )
    }
}


interface InputProps {
    name: string
    [x: string]: any
}

interface InputState {
    value?: any
    validation: string,
    status: "error" | "success" | "warning" | "validating"
}

class FormInput extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        log.info('Form:Input:constructor reached');
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            value: this.props.value?this.props.value:null,
            validation: '',
            status: 'validating'
        }
    }

    componentDidMount(): void {
        this.props?.handleRefresh(this.handleBlur);
        this.props?.handleReset(this.handleReset);
    }

    async handleReset() {
        await this.setState({
            value: null,
            validation: '',
            status: 'validating'
        });
    }

    async handleChange(e: any) {
        await this.setState({
            value: e.currentTarget.value
        })
        // this.props.handleChange(this.props.name, this.state.value, this.state.status)
    }

    async handleBlur(e: any) {
        log.info('Form:Input:handleBlur reached');

        if (this.props.rules) {

            let result = validate.single(this.state.value, this.props.rules);
            if (result) {
                await this.setState({
                    value: e?e.currentTarget.value:this.state.value,
                    validation: result[0],
                    status: 'error'
                });
            }
            else {
                await this.setState({
                    value: e?e.currentTarget.value:this.state.value,
                    validation: '',
                    status: 'success'
                });
            }
            //this.props.handleChange(this.props.name, this.state.value, this.state.status)
            return {...this.state, name: this.props.name};
        }
    }

    render() {
        log.info('Form:Input:render reached');
        let {handleChange,  handleBlur, handleRefresh, handleReset, name, label, value,  ...props} = this.props;
        return (
            <div className={[style.component].join(' ')} key={name}>
                <Form.Item
                    validateStatus={this.state.status}
                    extra={this.state.validation}
                    label={this.props.label}
                >
                    <Input
                        {...props}
                        value={this.state.value}
                        name={name}
                        onChange={ this.handleChange }
                        onBlur={ this.handleBlur }

                    />
                </Form.Item>
            </div>
        )
    }
}

interface Props {
    children?: any[]
    handleSubmit?: any
}
class Component extends React.Component<Props> {
    protected rules: any
    protected handleRefresh: any
    protected handleReset: any

    constructor(props: Props) {
        log.info('Form:constructor reached');
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = [];
        this.handleRefresh = [];
    }

    async handleSubmit() {
        log.info('Form:handleSubmit reached');
        let values:any = []
        for (let f of this.handleRefresh) {
            values.push(await f());
        }
        for (let f of this.handleReset) {
            await f();
        }
        return values;
    }

    componentDidMount(): void {
        log.info('Form:componentDidMount reached');
        this.props.handleSubmit(this.handleSubmit);
    }

    render() {
        log.info('Form:render reached');
        let children = null;
        if (this.props.children) {
            children = this.props.children.map(child => {
                return(
                    React.cloneElement(child, {
                        key: child.props.name,
                        className: "input",
                        handleRefresh: (f:any) => { this.handleRefresh.push(f)},
                        handleReset: (f: any) => { this.handleReset.push(f) }
                    })
                )
            })
        }

        return (
            <div className={[style.component].join(' ')}>
                <Form className={[style.form].join(' ')}>
                    {children}
                </Form>
            </div>
        )
    }
}

export {Component as Form, FormInput as Input, FormSelect as Select, FormTree as Tree};



