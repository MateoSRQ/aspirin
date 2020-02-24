import React from 'react';
import style from './index.module.scss'
import log from 'loglevel';
import Scrollable from 'react-custom-scrollbars';

import 'antd/dist/antd.css';

log.setLevel('warn');

interface Props {
    children?: React.ReactNode[]
}
export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.info('List:constructor reached');
        super(props);
    }

    render() {
        log.info('List:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <Scrollable
                    className={[style.scroller].join(' ')}
                    // renderTrackHorizontal={() => { return <div {...this.props} className="track-horizontal"/>}}
                    // renderTrackVertical={  () => { return <div {...this.props} className="track-vertical"/>}}
                    // renderThumbHorizontal={() => { return <div {...this.props} className="thumb-horizontal"/>}}
                    // renderThumbVertical={  () => { return <div {...this.props} className="thumb-vertical"/>}}
                    // renderView={           () => { return <div {...this.props} className="view"/>}}
                >
                    {this.props.children}
                </Scrollable>
            </div>
        )
    }
}



