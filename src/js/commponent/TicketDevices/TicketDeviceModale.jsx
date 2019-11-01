import React, { Component } from 'react';
import DeviceCard from './DeviceCards'
export default class TicketDeviceContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data
        }
        this.renderDevices = this.renderDevices.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    renderDevices = () => {
        if (this.state.data) {
            let items = this.state.data.devices.map((node, index) => {
                return <DeviceCard {...node} key={'device_' + index} />
            })
            return items
        }
    }



    render() {

        let {ticketID, name ,floor} = this.state.data
        return (
            <React.Fragment>
                <div className='change_ticket_container' onClick={(e) => e.stopPropagation()}>
                    <div className=' animated fadeIn'>
                        <div className='room_info'>
                            <div className='room_info_items'>
                                <label>name: </label> <span> {name} </span>
                            </div>
                            <div className='room_info_items'>
                                <label>floor: </label> <span> {floor} </span>
                            </div>
                            <div className='room_info_items'>
                                <label>ticket ID: </label> <span> {ticketID} </span>
                            </div>
                
                        </div>
                        {this.renderDevices()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
