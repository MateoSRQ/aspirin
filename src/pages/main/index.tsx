import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import { Breadcrumb } from 'antd';

import Loader from '../../components/loader';

import 'antd/dist/antd.css';

interface State {}
interface Props {}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Main:constructor reached');
        super(props);
    }

    render() {
        log.info('Main:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <Loader>
                    <div className={[style.breadcrumb].join(' ')}>
                        <Breadcrumb>
                            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Administración</a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className={[style.title].join(' ')}>Esquema de Administración de Sedes</div>
                </Loader>
            </div>
        )
    }
}


