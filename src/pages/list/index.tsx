import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import { Input } from 'antd';

import List from '../../components/list';
import Item from './item';
import Loader from '../../components/loader';
import withData from '../../components/dataLoader';

const { Search } = Input;

interface State {}
interface Props {}

const DataLoader = withData(Loader);

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('List:constructor reached');
        super(props);
    }

    render() {
        log.info('List:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.search].join(' ')}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                    />
                </div>

                <div className={[style.body].join(' ')}>

                    <DataLoader connections={[
                        {variable: 'sedes',     url: "http://127.0.0.1:3333/api/v2/sedes",      method: "get"},
                        {variable: 'examenes',  url: "http://127.0.0.1:3333/api/v2/examenes",   method: "get"}
                    ]}>
                        <List>
                        <Item active/>
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item active/>
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                    </List>
                </DataLoader>

                </div>

            </div>
        )

    }
}



