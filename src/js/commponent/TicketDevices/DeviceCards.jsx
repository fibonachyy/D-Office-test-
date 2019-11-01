import React, { Component } from 'react';

export default class DeviceCard extends Component {
    constructor(props){
        super(props)
        try{
            this.state = {
                type : this.props.type.toString().toLowerCase() === 'interactable' ? 1 : 0
            }
        }catch(e){
            console.warn(e)
        }
        this.handleDeviceType = this.handleDeviceType.bind(this)
    }



    handleDeviceType = ()=>{
        let node = Object.assign({}, this.props)
        if(this.state.type === 1){  
            this.setState({
                type : 0
            },()=>{
                node.type = 'none'
            })
        }else if(this.state.type === 0){
            this.setState({
                type : 1
            },()=>{
                node.type = 'interactable'
            })
        }
    }
  render() {
    try{
        return (
            <React.Fragment>
                <div className='room_inforamtion'>
                </div>
                <div className={this.state.type === 1 ? 'Device_card Device_card--intractable' : 'Device_card '}
                 key={'device_'+ this.props.id}
                 onClick={()=> this.handleDeviceType()}
                 >
                  <span>{this.props.name}</span>
                </div>
            </React.Fragment>
          );
    }catch(e){
        return null
    }
  }
}
