import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import { Breadcrumb, Icon, Button } from 'antd';

import Loader from '../../components/loader';
import Modal from '../../components/modal';
import {Form, Input} from '../../components/form';
import _ from 'lodash';
import axios from 'axios';

import 'antd/dist/antd.css';

interface State {
    newModalVisible: boolean,
    newModalData: any
}

interface Props {
    newSedeSubmit: any
}
export default class Component extends React.Component<Props, State> {

    protected newSedeHandleSubmit: any;

    constructor(props: Props) {
        log.info('Main:constructor reached');
        super(props);
        this.newSede = this.newSede.bind(this);
        this.newModalHandleChange = this.newModalHandleChange.bind(this);
        this.newModalHandleSubmit = this.newModalHandleSubmit.bind(this);

        this.state = {
            newModalVisible: false,
            newModalData: {
                nombre: {value: '', status: 'validating'},
                descripcion: {value: '', status: 'validating'}
            }
        };
        this.newSedeHandleSubmit = null;
    }

    newModalHandleChange (name: string, e: any, status: string) {
        let data = this.state.newModalData;
        data[name] = {value: e, status: status};
        this.setState({newModalData: data});
    }

    async newModalHandleSubmit () {
        console.log('XYZ');
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

    newSede() {
        log.info('Main:newSede reached');
        console.log('new sede')
        this.setState({
            newModalVisible: true
        });
    }

    render() {
        log.info('Main:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.title].join(' ')}>Sede San Isidro</div>
                <Loader status="loaded">
                    <div className={[style.breadcrumb].join(' ')}>
                        <Breadcrumb>
                            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Administración</a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div className={[style.buttons].join(' ')}>
                        <Button onClick={this.newSede}>Nueva Sede</Button>
                        <Button>Default</Button>
                        <Button>Default</Button>
                        <Button>Default</Button>
                    </div>
                </Loader>
                <Modal
                    visible={this.state.newModalVisible}
                    handleSubmit={this.newModalHandleSubmit}
                >
                    <Form handleSubmit={(f: any) => { this.newSedeHandleSubmit = f }}>
                        <Input name="nombre"      placeholder="Nombre"      label="Nombre"        rules={{presence: {allowEmpty: false, message: 'Este campo no puede estar vacío'}}}/>
                        <Input name="descripcion" placeholder="Descripción" label="Descripción"   rules={{presence: {allowEmpty: false, message: 'Este campo no puede estar vacío'}}}/>
                    </Form>
                </Modal>
            </div>
        )
    }
}



