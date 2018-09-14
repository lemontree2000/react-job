import React from 'react';


export default function JobForm(Comp: any) {
    class WrapperCom extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }
        public handleChange(key: string, val: any) {
            this.setState({
                [key]: val
            } as any)
        }

        public render() {
            return <Comp state={this.state} handleChange={this.handleChange} {...this.props} />
        }
    }
    return WrapperCom;
}
