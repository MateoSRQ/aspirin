import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import 'antd/dist/antd.css';

interface State {}
interface Props {}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Base:constructor reached');
        super(props);
    }

    render() {
        log.info('Base:render reached');
        return (
            <div className={[style.component].join(' ')}>
            </div>
        )

    }
}



