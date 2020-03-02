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
    status: string,
    active: any
};

interface Props {
    sedes: any
    status: string
    handleItemClick: any
    active: any
}


export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('List:constructor reached');
        super(props);
        this.state = ({
            sedes: null,
            status: 'loading',
            active: this.props.active
        });
        //this.loadSede = this.loadSede.bind(this);
    }


    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        log.info('List:componentDidUpdate reached');
        if (this.props !== prevProps) {
            this.setState({
                sedes: this.props.sedes,
                status:this.props.status,
                active: this.props.active
            })
            if (this.props.active !== prevProps.active) {
                this.props.handleItemClick(this.props.active);
            }
        }


    }


    render() {
        log.info('List:render reached');
        let items = null;
        if (this.state.sedes) {
            items = this.state.sedes.map((item: any) => {
                let active = false;
                if (this.state.active == item._id) {
                    active = true;
                }
                return (
                    <Item
                        {...item}
                        active={active}
                        key={item._id}
                        handleClick={() => {this.props.handleItemClick(item._id)}}
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



