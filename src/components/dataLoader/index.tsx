import React from 'react';
import style from './index.module.scss'
import log from 'loglevel';
import axios from 'axios';

import 'antd/dist/antd.css';

log.setLevel('warn');

interface Props {}

export default function
    withComponent<P extends object>(WrappedComponent: any) {

    // {
    //     variable: string,
    //         method: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "link" | "LINK" | "unlink" | "UNLINK" | undefined,
    //     url: string
    // }[]

    interface Props {
        connections: any[]

    }
    interface State {
        status: string,
        [x: string]: any
    }

        return class extends React.Component<Props, State> {
            constructor(props: Props) {
                super(props);
                this.state = {
                    status: 'loading'
                }
            }

            componentDidMount() {
                log.info('Data:componentDidMount reached');
                let promiseData = [];
                let variables: string[] = [];
                for (let connection of this.props.connections) {
                    variables.push(connection.variable);
                    promiseData.push(
                        axios({
                            method: connection.method,
                            url: connection.url
                        }));
                }
                Promise.all(promiseData).then(values => {
                    let vals: any = {};
                    for (let value in values) {
                        let v: string = variables[value]
                        vals[v] = values[value]
                    }
                    console.log('WAKA')
                    this.setState({
                        status: 'loaded',
                        ...vals
                    });
                })
            }


            render() {
                let {connections, ...props} = this.props;
                return <WrappedComponent {...props} />
            }
    }
}



