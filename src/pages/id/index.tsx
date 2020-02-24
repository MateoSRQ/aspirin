import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import {Avatar, Icon} from 'antd';

import 'antd/dist/antd.css';

interface State {}
interface Props {}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('ID:constructor reached');
        super(props);
    }

    render() {
        log.info('ID:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.idContainer].join(' ')}>
                    <Avatar
                        size={128}
                        className={[style.idAvatar].join(' ')}
                        src="images/face_co.png"
                    />
                    <div className={[style.idName].join(' ')}>James T. Hetfield</div>
                    <div className={[style.idRole].join(' ')}>Administrador</div>
                </div>
            </div>
        )

    }
}



