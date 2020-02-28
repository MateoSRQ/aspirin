import React from 'react';
import style from './index.module.scss'
import log from 'loglevel';
import { Spin, Icon } from 'antd';

import 'antd/dist/antd.css';

log.setLevel('warn');

interface Props {
    status: string
    children: any
}
interface State {
    status: string
}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Loader:constructor reached');
        super(props);

        this.state = {
            status: this.props.status?this.props.status:'loading'
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        log.info('Loader:componentDidUpdate reached');
        if (prevProps !== this.props) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        log.info('Loader:render reached');
        let loader = (
            <div className={[style.loader].join(' ')}>
                <Spin indicator={<Icon type="loading" style={{ fontSize: 48 }} spin />} />
            </div>
        )

        switch (this.state.status) {
            case 'loading':
                loader = (
                    <div className={[style.loader].join(' ')}>
                        <Spin indicator={<Icon type="loading" style={{ fontSize: 48 }} spin />} />
                    </div>
                )
                break;
            case 'loaded':
                loader = (
                    <div className={[style.loader, style.loaded].join(' ')}>
                        <Spin indicator={<Icon type="loading" style={{ fontSize: 48 }} spin />} />
                    </div>
                )
                break;
        }

        let children = this.props.children;

        return (
            <div className={[style.component].join(' ')}>
                {loader}
                <div className={[style.container].join(' ')}>
                    {children}
                </div>
            </div>
        )
    }

    static defaultProps = {
        status: "loading",
    }
}



