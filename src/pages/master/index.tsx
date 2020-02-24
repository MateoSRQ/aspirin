import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import MediaQuery from 'react-responsive'
import { Scrollbars } from 'react-custom-scrollbars';

import ID from '../id';
import List from '../list';
import Main from '../main';

interface State {
    bigSize: boolean
}

interface Props {}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Master:constructor reached');
        super(props);
        this.handleMediaQueryChange = this.handleMediaQueryChange.bind(this);
        this.state = {
            bigSize: true
        };
    }

    handleMenuClick(): void {
        log.info('Master:handleMenuClick reached');
    }

    handleMediaQueryChange(e: any) {
        log.info('Master:handleMediaQueryChange reached');
        this.setState({
            bigSize: e
        });
    }

    componentDidMount(): void {
        log.info('Master:componentDidMount reached');
    }

    render() {
        log.info('Master:render reached');
        // let size = 1440;
        // if (!this.state.bigSize) {
        //     size = 1120;
        // }
        return (
            <div className={[style.component].join(' ')}>
                <MediaQuery minWidth={1440} onChange={this.handleMediaQueryChange}>
                    {null}
                </MediaQuery>
                <div className={[style.title].join(' ')}>
                    <div className={[style.left].join(' ')}></div>
                    <div className={[style.middle].join(' ')}></div>
                    <div className={[style.right].join(' ')}></div>
                </div>
                <div className={[style.body].join(' ')} >
                    <div className={[style.left].join(' ')}>
                        <ID />
                    </div>
                    <div className={[style.middle].join(' ')}>
                        <List />
                    </div>
                    <div className={[style.right].join(' ')}>
                        <Main />
                    </div>
                </div>
            </div>
        );
    }
}



