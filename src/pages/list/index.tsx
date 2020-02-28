import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import { Input } from 'antd';

import List from '../../components/list';
import Item from './item';
import Loader from '../../components/loader';
import axios from 'axios';
import jsonpack from 'jsonpack';

const { Search } = Input;

interface State {
    sedes: any
    status: string
};

interface Props {
    sedes: any
    status: string
}


export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('List:constructor reached');
        super(props);
        this.state = ({
            sedes: null,
            status: 'loading'
        });
        //this.loadSede = this.loadSede.bind(this);
    }

    async componentDidMount(): Promise<void> {
        log.info('List:componentDidMount reached');
        //await this.loadSede();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        console.log('diu')
        if (this.props != prevProps) {
            this.setState({
                sedes: this.props.sedes,
                status:this.props.status
            })
        }
    }

    render() {
        log.info('List:render reached');
        let items = null;
        if (this.state.sedes) {
            items = this.state.sedes.map((item: any) => {
                return (
                    <Item
                        {...item}
                        key={item._id}
                    />
                )
            })
        }

        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.search].join(' ')}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                    />
                </div>

                <div className={[style.body].join(' ')}>
                    <Loader status={this.state.status}>
                        <List>
                            {items}
                        </List>
                    </Loader>
                </div>
            </div>
        )
    }

    static defaultProps: {
        sedes: null,
        status: 'loading'
    }
}



