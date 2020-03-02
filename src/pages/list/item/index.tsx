import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import { Input, Row, Col, Avatar } from 'antd';

import 'antd/dist/antd.css';



interface State {}
interface Props {
    active?: boolean
    _id: string,
    nombre: string,
    descripcion: string
    handleClick?: any
};

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Item:constructor reached');
        super(props);
    }

    render() {
        log.info('Item:render reached');
        let styles = [style.component]
        if (this.props.active) {
            styles = [style.component, style.active];
        }
        return (
            <div className={styles.join(' ')} onClick={ ()=> {this.props?.handleClick(this.props._id)}}>
                <Row>
                    <Col span={4} className={[style.centered].join(' ')}>
                        <div className={[style.circle].join(' ')}></div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={18}>
                        <div className={[style.prefix].join(' ')}>{this.props._id}</div>
                        <div className={[style.title].join(' ')}>{this.props.nombre}</div>
                        <div className={[style.subTitle].join(' ')}>{this.props.descripcion}</div>
                    </Col>
                </Row>
            </div>
        )
    }
}



