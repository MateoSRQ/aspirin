import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import { Breadcrumb, Icon, Button } from 'antd';
import { Tabs, Radio } from 'antd';
import { Table } from 'antd';

import Loader from '../../components/loader';
import Modal from '../../components/modal';

import Item from './item';

import {Form, Input} from '../../components/form';
import _ from 'lodash';
import axios from 'axios';

import 'antd/dist/antd.css';

const { TabPane } = Tabs;

interface State {
    newSedeVisible: boolean
    newNodoVisible: boolean
    data: any
};

interface Props {
    newSedeSubmit: any
    data: any
    status: string
};

const tabKeys = ["VISUAL", "RECEPCION", "ELECTROCARDIOGRAMA", "CONSULTORIO", "PSICOLOGIA", "CAJA", "ENTREGA DE RESULTADOS", "LABORATORIO", "AUDIOMETRIA", "RADIOLOGIA", "ODONTOLOGIA", "SALA MULTIPLE", "TELEMEDICINA", "CARDIOLOGIA"]

export default class Component extends React.Component<Props, State> {

    //protected newSedeHandleSubmit: any;
    protected newSedeHandleSubmit: any
    protected newNodoHandleSubmit: any

    constructor(props: Props) {
        log.info('Main:constructor reached');
        super(props);

        this.newSedeHandleChange  = this.newSedeHandleChange.bind(this);
        this.newNodoHandleChange  = this.newNodoHandleChange.bind(this);
        this.newSedeHandleOk      = this.newSedeHandleOk.bind(this);
        this.newNodoHandleOk      = this.newNodoHandleOk.bind(this);

        this.newSedeClick = this.newSedeClick.bind(this);
        this.newNodoClick = this.newNodoClick.bind(this);

        this.state = {
            newSedeVisible: false,
            newNodoVisible: false,
            data: null
        };

    }

    async newSedeHandleOk() {
        let values = await this.newSedeHandleSubmit();
        let status = _.find(values, function(o: any) { return o.status == 'error' ; });
        console.log(values);
        let data: any;
        data = {
            nombre: null,
            descripcion: null
        };
        if (status === undefined) {
            values.map((value: any ) => {
                data[value.name] = value.value
            })

            await this.props.newSedeSubmit(data);
            this.setState({
                newSedeVisible: false
            });
        }
    }

    async newNodoHandleOk() {
        let values = await this.newNodoHandleSubmit();
        let status = _.find(values, function(o: any) { return o.status == 'error' ; });
        console.log(values);
            this.setState({
                newNodoVisible: false
            });
        //}
    }

    newSedeClick() {
        this.setState({newSedeVisible: true});
    }

    newNodoClick() {
        this.setState({newNodoVisible: true});
    }

    newSedeHandleChange(e: boolean) {
        this.setState({newSedeVisible: e});
    }

    newNodoHandleChange(e: boolean) {
        this.setState({newNodoVisible: e});
    }





    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (this.props !== prevProps) {
            this.setState({
                data: this.props.data
            });
        }
    }


/*
    newModalHandleChange (name: string, e: any, status: string) {
        let data = this.state.newModalData;
        data[name] = {value: e, status: status};
        this.setState({newModalData: data});
    }

    async newModalHandleSubmit () {
        let values  = await this.newSedeHandleSubmit();
        let status = _.find(values, function(o: any) { return o.status == 'error' ; });

        let data: any;
        data = {
            nombre: null,
            descripcion: null
        };
        if (status == undefined) {
            values.map((value: any ) => {
                data[value.name] = value.value
            })

            await this.props.newSedeSubmit(data);
            this.setState({
                newModalVisible: false
            });
        }
    }

    async newSede() {
        log.info('Main:newSede reached');
        await this.setState({
            newModalVisible: true
        });
        console.log(this.state);
    }

    async newNodo() {
        log.info('Main:newSede reached');
        await this.setState({
            newNodeModalVisible: true
        });
        console.log(this.state);
    }

 */

    render() {
        log.info('Main:render reached');
        let tabs = null;
        if (this.props.data?.nodos) {
            let self = this;
            tabs = tabKeys.map(function(key, index) {
                let data = self.props.data.nodos[key]
                return (
                    <TabPane tab={key} key={key}>
                        <div className={[style.paneButtons].join(' ')}>
                            <Button onClick={self.newNodoClick}>Nuevo nodo</Button>
                        </div>
                        <Table
                            size="small"
                            className={[style.paneTable].join(' ')}
                            columns={[
                                // {title: 'id', dataIndex: '_id', key: '_id'},
                                {title: 'nombre', dataIndex: 'codigo', key: 'codigo'},
                                // {
                                //     title: 'Action',
                                //     key: 'action',
                                //     render: (item) => <a>{item._id}</a>,
                                // },
                            ]}
                            rowKey={'_id'}
                            expandedRowRender={record => <Item />}
                            dataSource={data}
                        />
                    </TabPane>
                )
            });
            tabs = (
                <div>

                    <Tabs>{tabs}</Tabs>
                </div>
            )
        }

        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.buttons].join(' ')}>
                    <Button onClick={this.newSedeClick}>Nueva Sede</Button>
                    <Button >Editar Sede</Button>
                </div>
                <div className={[style.container].join(' ')}>
                    <Loader status={this.props.status}>
                        <div className={[style.breadcrumb].join(' ')}>
                            <Breadcrumb>
                                <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="">Administración</a>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className={[style.title].join(' ')}>{this.props?.data?.nombre}</div>
                        {tabs}
                    </Loader>
                </div>
                <Modal
                    visible={this.state.newSedeVisible}
                    handleChange={this.newSedeHandleChange}
                    handleOk={this.newSedeHandleOk}
                    title="Nueva Sede"
                >
                    <Form
                        handleSubmit={(f: any) => { this.newSedeHandleSubmit = f }}
                    >
                        <Input name="nombre"      value={null} placeholder="Nombre"      label="Nombre"        rules={{presence: {allowEmpty: false, message: 'Este campo no puede estar vacío'}}}/>
                        <Input name="descripcion" value={null} placeholder="Descripción" label="Descripción"   rules={{presence: {allowEmpty: false, message: 'Este campo no puede estar vacío'}}}/>
                    </Form>
                </Modal>

                <Modal
                    visible={this.state.newNodoVisible}
                    handleChange={this.newNodoHandleChange}
                    handleOk={this.newNodoHandleOk}
                    title="Nuevo nodo"
                >
                    <Form
                        handleSubmit={(f: any) => { this.newNodoHandleSubmit = f }}
                    >
                        <Input name="nombre"      value={null} placeholder="Nodo"      label="Nodo"        rules={{presence: {allowEmpty: false, message: 'Este campo no puede estar vacío'}}}/>
                        <Input name="descripcion" value={null} placeholder="Codo"      label="Codo"        rules={{presence: {allowEmpty: false, message: 'Este campo no puede estar vacío'}}}/>
                    </Form>
                </Modal>

            </div>
        )
    }
}



