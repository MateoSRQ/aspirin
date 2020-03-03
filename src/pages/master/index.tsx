import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import MediaQuery from 'react-responsive'
import { Scrollbars } from 'react-custom-scrollbars';

import ID from '../id';
import List from '../list';
import Main from '../main';
import Loader from '../../components/loader';
import axios from 'axios';
import jsonpack from "jsonpack";

interface State {
    bigSize: boolean,
    sedes: null,
    examenes: null,
    sedesStatus: string,
    sedesData: any,
    sedeActive: any,
    mainStatus: string
}

interface Props {}
export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Master:constructor reached');
        super(props);
        this.handleMediaQueryChange = this.handleMediaQueryChange.bind(this);
        this.loadSede = this.loadSede.bind(this);
        this.loadExamen = this.loadExamen.bind(this);
        this.handleNewSedeSubmit = this.handleNewSedeSubmit.bind(this);
        this.itemClick = this.itemClick.bind(this);

        this.state = {
            bigSize: true,
            sedes: null,
            examenes: null,
            sedesStatus: 'loading',
            sedesData: null,
            sedeActive: null,
            mainStatus: 'loading'
        };
    }

    async itemClick(id: any) {
        log.info('Master:itemClick reached');
        console.log('yyy')
        this.setState({mainStatus: 'loading'});
        try {
            let p1 = await axios({
                method: 'get',
                url: 'http://127.0.0.1:3333/api/v3/sede/' + id
            });
            p1 = jsonpack.unpack(p1.data);
            this.setState({
                sedesData: p1,
                mainStatus: 'loaded',
                sedeActive: id
            });
        }
        catch (e) {
            console.log(e)
        }
    }

    async handleNewSedeSubmit(data: any, modal: boolean = false) {
        log.info('Master:handleNewSedeSubmit reached');
        try {
            let r1 = await axios({
                method: 'post',
                url: 'http://127.0.0.1:3333/api/v3/sedes',
                data: data
            });
            let rr1 = r1.data;
            console.log('RESPONSE');
            console.log(r1);

            // await this.loadSede();

            await this.setState({
                sedesStatus: 'loading'
            })
            let p1 = await axios({method: 'get', url: 'http://127.0.0.1:3333/api/v3/sedes'});
            let response = jsonpack.unpack(p1.data);

            await this.setState({
                sedes: response,
                sedesStatus: 'loaded',
                sedeActive: rr1._id

            })
            console.log(this.state);
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
        this.loadSede()
        this.loadExamen()
    }

    async loadSede() {
        log.info('Master:loadSede reached');
        await this.setState({
            sedesStatus: 'loading'
        })
        let p1 = await axios({method: 'get', url: 'http://127.0.0.1:3333/api/v3/sedes'});
        let response = jsonpack.unpack(p1.data);
        await this.setState({
            sedes: response,
            sedesStatus: 'loaded',
            sedeActive: response[0]._id
        })
    }

    async loadExamen() {
        log.info('Master:loadExamen reached');
        let p1 = await axios({method: 'get', url: 'http://127.0.0.1:3333/api/v3/examenes'});
        let response = p1.data; //jsonpack.unpack(p1.data);



        await this.setState({
            examenes: response,
        })
    }

    render() {
        log.info('Master:render reached');

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
                        <List
                            sedes={this.state.sedes}
                            status={this.state.sedesStatus}
                            handleItemClick={this.itemClick}
                            active={this.state.sedeActive}
                        />
                    </div>
                    <div className={[style.right].join(' ')}>
                        <Main
                            newSedeSubmit={this.handleNewSedeSubmit}
                            data={this.state.sedesData}
                            examenes={this.state.examenes}
                            status={this.state.mainStatus}
                        />
                    </div>
                </div>
            </div>
        );
    }
}



