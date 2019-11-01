import React, { Component } from 'react';
import MainFetch from '../GlobalFetch';
import { apis } from '../../../configs/ConfigApi';
import _ from 'underscore';
export default class TicketCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.renderItems = this.renderItems.bind(this);
    }
    componentDidMount() {
        this.FetchData()
    }

    FetchData = () => {
        MainFetch.get(apis.tickets,
            {},
            (data) => {
                if(!_.isEqual(this.state.tickets, data)){
                    this.setState({
                        tickets : data
                    })
                }
            },
            (err) => {
                console.log('err', err)
            })
    }

    renderItems = () => {
        if (this.state.tickets) {
            let items = this.state.tickets.map((node, index) => {
                return (
                    <div className='ticket_card animated fadeIn'
                        key={'ticket_' + index}
                        style={{ animationDelay: `${index / 10 * 2}s` }}
                        onClick={()=> this.props.openChangeModale(node)}
                    >
                        <span className='ticket_card_fileds'>
                            <label>Ticket number: </label>
                            <span> {node.ticketNumber}</span>
                        </span>
                        <span className='ticket_card_fileds'>
                            <label>start Date: </label>
                            <span> {node.startDate}</span>
                        </span>
                        <span className='ticket_card_fileds'>
                            <label>Expire Date: </label>
                            <span> {node.expireDate}</span>
                        </span>
                        <span className='ticket_card_fileds'>
                            <label>Hours: </label>
                            <span> {node.hours}</span>
                        </span>

                    </div>
                )
            })
            return items
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className='ticket_container'>
                    {this.renderItems()}
                </div>
            </React.Fragment>
        );
    }
}
