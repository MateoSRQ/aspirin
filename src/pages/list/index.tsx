import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import { Input } from 'antd';

import List from '../../components/list';
import Item from './item';
import Loader from '../../components/loader';

const { Search } = Input;

interface State {}
interface Props {}
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
                    <Loader>
                        <List>
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
                            <Item />
                        </List>
                    </Loader>
                </div>

            </div>
        )

    }
}



