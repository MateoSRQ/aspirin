import React from 'react';
import style from './index.module.scss'
import log from 'loglevel';
import Scrollable from 'react-custom-scrollbars';

import 'antd/dist/antd.css';

log.setLevel('warn');

interface Props {
    children?: React.ReactNode[]
}
interface State {
    scrollClass: any
}

export default class Component extends React.Component<Props, State> {

    constructor(props: Props) {
        log.info('List:constructor reached');
        super(props);
        this.state = {
            scrollClass: style.top
        }
    }

    render() {
        log.info('List:render reached');

        return (
            <div className={[style.component, this.state.scrollClass].join(' ')}>
                <Scrollable
                    className={[style.scroller].join(' ')}
                    onScrollFrame={(values: any) => {
                        if (values.top == 0) {console.log('top'); this.setState({scrollClass: style.top})}
                        else if (values.top == 1) {console.log('bottom'); this.setState({scrollClass: style.bottom})}
                        else { this.setState({scrollClass: null})}
                    }}
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



