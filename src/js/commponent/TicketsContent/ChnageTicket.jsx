import React, { Component } from 'react';
import MainFetch from '../GlobalFetch';
import { apis } from '../../../configs/ConfigApi';
import _ from 'underscore';
export default class ChnageTicketContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editableHoure: false,
            
        }
        this.handelChnageTime = this.handelChnageTime.bind(this);
        this.updateTicket = this.updateTicket.bind(this);
    }
    componentDidMount(){
        if(!_.isEmpty(this.props.data)){
            this.setState({
                editableHoure: false,
                from: this.props.data.hours.split('-')[0],
                to: this.props.data.hours.split('-')[1],
                firstFrom: this.props.data.hours.split('-')[0],
                firstTO: this.props.data.hours.split('-')[1]
            })
        }  
    }
    UNSAFE_componentWillReceiveProps(props) {
        if(!_.isEmpty(props.data)){
            this.setState({
                editableHoure: false,
                from: props.data.hours.split('-')[0],
                to: props.data.hours.split('-')[1],
                firstFrom: props.data.hours.split('-')[0],
                firstTO: props.data.hours.split('-')[1]
            })
        }   
    }


    handelChnageTime = (e, filed) => {
        this.setState({
            [filed]: e.target.value
        })
    }

    updateTicket = () => {
        console.log(
           {
                ticketID: this.props.data.ticketID,
                hours: this.state.from + '-' + this.state.to
            }
        )

        // this method send new details of ticket into the server for partial update 
        MainFetch.post(apis.tickets,
            {
                ticketID: this.props.data.ticketID,
                hours: this.state.from + '-' + this.state.to
            },
            {},
            (data) => {
                console.log(data)
            },
            (err) => console.warn(err)
        )
    }

    render() {

        let {  ticketNumber, startDate, expireDate, hours } = this.props.data
        return (
            <React.Fragment>
                <div className='change_ticket_container' onClick={(e) => e.stopPropagation()}>
                    <div className=' animated fadeIn'
                    >
                        <span className='ticket_card_fileds'>
                            <label>Ticket number: </label>
                            <span> {ticketNumber}</span>
                        </span>
                        <span className='ticket_card_fileds'>
                            <label>start Date: </label>
                            <span> {startDate}</span>
                        </span>
                        <span className='ticket_card_fileds'>
                            <label>Expire Date: </label>
                            <span> {expireDate}</span>
                        </span>
                        {
                            !this.state.editableHoure
                                ?
                                <span className='ticket_card_fileds'>
                                    <label>Hours: </label>
                                    <span> {hours}</span>
                                    <sub className='edit_btn'
                                        onClick={() => this.setState({ editableHoure: true })}
                                    >Edit</sub>
                                </span>
                                :
                                <span className='ticket_card_fileds animated fadeIn'>
                                    <label>Hours: </label>
                                    <div className='edit_input_group'>
                                        <span>From:</span> <input type='time' onChange={(e) => this.handelChnageTime(e, 'from')} defaultValue={this.state.from} />
                                    </div>
                                    <div className='edit_input_group'>
                                        <span>To:</span> <input type='time' onChange={(e) => this.handelChnageTime(e, 'to')} defaultValue={this.state.to} />
                                    </div>
                                </span>

                        }


                    </div>
                    {
                        this.state.firstFrom !== this.state.from | this.state.to !== this.state.firstTO
                            ?
                            <div className='send_ticket_btn' onClick={() => this.updateTicket()}>
                                <span>Save</span>
                            </div>
                            :
                            ''
                    }


                </div>
            </React.Fragment>
        );
    }
}
