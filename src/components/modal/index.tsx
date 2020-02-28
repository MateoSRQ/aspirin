import React from 'react';
import style from './index.module.scss'
import log from 'loglevel';

import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

log.setLevel('warn');

interface Props {
    visible?: boolean
    handleSubmit?: any
}
interface State {
    visible: boolean
}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Modal:constructor reached');
        super(props);

        this.state = {
            visible: this.props.visible?this.props.visible:false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel() {
        log.info('Modal:handleCancel reached');
        this.setState({
            visible: false
        });
    }

    handleSubmit() {
        log.info('Modal:handleSubmit reached');
        this.props?.handleSubmit();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevProps != this.props) {
            let visible =  this.props.visible?this.props.visible:false;
            this.setState({
               visible: visible
            });
        }
    }

    render() {
        log.info('Modal:render reached');
        return (
            <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <div className={[style.component].join(' ')}>
                    {this.props.children}
                </div>
            </Modal>
        )
    }
}



