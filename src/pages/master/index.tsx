import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import MediaQuery from 'react-responsive'
import { Scrollbars } from 'react-custom-scrollbars';

import ID from '../id';
import List from '../list';
import Main from '../main';
import axios from 'axios';
import jsonpack from "jsonpack";

interface State {
    bigSize: boolean,
    sedes: null,
    sedesStatus: string
}

interface Props {}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Master:constructor reached');
        super(props);
        this.handleMediaQueryChange = this.handleMediaQueryChange.bind(this);
        this.loadSede = this.loadSede.bind(this);
        this.handleNewSedeSubmit = this.handleNewSedeSubmit.bind(this);
        this.state = {
            bigSize: true,
            sedes: null,
            sedesStatus: 'loading'
        };
    }


    async handleNewSedeSubmit(data: any) {
        try {

            await axios({
                method: 'post',
                url: 'http://127.0.0.1:3333/api/v3/sedes',
                data: data
            });
            // await this.loadSede();

            await this.setState({
                sedesStatus: 'loading'
            })
            let p1 = await axios({method: 'get', url: 'http://127.0.0.1:3333/api/v3/sedes'});

            await this.setState({
                sedes: jsonpack.unpack(p1.data),
                sedesStatus: 'loaded'
            })


        }
        catch (e) {
            console.log(e)
        }
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
        this.loadSede();
    }

    async loadSede() {

        await this.setState({
            sedesStatus: 'loading'
        })
        let p1 = await axios({method: 'get', url: 'http://127.0.0.1:3333/api/v3/sedes'});

        await this.setState({
            sedes: jsonpack.unpack(p1.data),
            sedesStatus: 'loaded'
        })

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
                {/*<div className={[style.title].join(' ')}>*/}
                {/*    <div className={[style.left].join(' ')}></div>*/}
                {/*    <div className={[style.middle].join(' ')}></div>*/}
                {/*    <div className={[style.right].join(' ')}></div>*/}
                {/*</div>*/}
                <div className={[style.body].join(' ')} >
                    <div className={[style.left].join(' ')}>
                        <ID />
                    </div>
                    <div className={[style.middle].join(' ')}>
                        <List sedes={this.state.sedes} status={this.state.sedesStatus}/>
                    </div>
                    <div className={[style.right].join(' ')}>
                        <Main newSedeSubmit={this.handleNewSedeSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}



