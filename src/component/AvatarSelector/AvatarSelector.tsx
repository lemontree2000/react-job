import React from 'react';
import { Grid, List } from 'antd-mobile';

interface IAvatarProps {
    selectAvatar: (v: string) => {}
}

class AvatarSelector extends React.Component<IAvatarProps, any> {
    constructor(props: IAvatarProps) {
        super(props);
        this.state = {
            icon: '',
            text: ''
        };
    }

    public render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`./image/${v}.png`),
                text: v
            }));

        const avater = this.state.icon ? <div><span>已选择的头像</span><img width="20" src={this.state.icon} alt="" /></div> : '请选择头像';
        
        return (
            <div>
                <List renderHeader={avater}>
                    <Grid
                        columnNum={5}
                        onClick={(el: any) => {
                            this.setState(el);
                            this.props.selectAvatar(el.text);
                        }}
                        data={avatarList} />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;