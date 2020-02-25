import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import { Breadcrumb, Icon, Button } from 'antd';

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
                    <div className={[style.title].join(' ')}>Sede San Isidro</div>
                    {/*<div className={[style.buttons].join(' ')}>*/}


                    {/*    <Icon type="plus"  style={{ fontSize: '24px', color: '#000' }}/>*/}
                    {/*    <Icon type="delete"  style={{ fontSize: '24px', color: '#000' }}/>*/}
                    {/*    <Icon type="edit"  style={{ fontSize: '24px', color: '#000' }}/>*/}
                    {/*    <Icon type="copy"  style={{ fontSize: '24px', color: '#000' }}/>*/}
                    {/*</div>*/}
                </Loader>
            </div>
        )
    }
}



