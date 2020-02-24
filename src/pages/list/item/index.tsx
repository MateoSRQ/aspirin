import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import { Input, Row, Col, Avatar } from 'antd';

import 'antd/dist/antd.css';



interface State {}
interface Props {
    active?: boolean
}
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
            <div className={styles.join(' ')}>
                <Row>
                    <Col span={4} className={[style.centered].join(' ')}>
                        100
                    </Col>
                    <Col span={2}></Col>
                    <Col span={18}>
                        <div className={[style.prefix].join(' ')}>210921092109210921</div>
                        <div className={[style.title].join(' ')}>Clínica Surco</div>
                        <div className={[style.subTitle].join(' ')}>Calle Surco #1626, Surco</div>
                    </Col>
                </Row>
            </div>
        )
    }
}



