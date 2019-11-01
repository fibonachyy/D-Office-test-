import React, { Component } from 'react';
import MainFetch from '../GlobalFetch';
import { apis } from '../../../configs/ConfigApi';
import _ from 'underscore';
export default class TicketDevices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.renderItems = this.renderItems.bind(this);
        this.renderSlecetOptions = this.renderSlecetOptions.bind(this);
        this.filterRooms = this.filterRooms.bind(this);
    }
    componentDidMount() {
     this.FetchData()
    }

    FetchData = () => {
        this.filterRooms()
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

        MainFetch.get(apis.rooms,
            {},
            (data) => {
                if(!_.isEqual(this.state.tickets, data)){
                    this.setState({
                        rooms : data
                    })
                }
                
            },
            (err) => {
                console.log('err', err)
            })
    }

    filterRooms = (e)=>{
        let id;
        if(e){
             id = e.target.value
        }
        return(
            this.setState({
                filterRooms: id ? id : 0 
            })
        )
    }

    renderItems = () => {
        if (this.state.rooms) {
            let items = this.state.rooms.map((node, index) => {
                if(parseInt(this.state.filterRooms) !== 0){
                    if(this.state.filterRooms === node.ticketID){
                        return (
                            <div className='room_card animated fadeIn' key={'ticket_room_' + node.ticketID} 
                            onClick={()=> this.props.openChangeModale(node)}>
                                <div className='info_row_room'>
                                    <label>name: </label> <span>{node.name}</span>
                                </div>
                                <div className='info_row_room'>
                                    <label>floor: </label> <span>  {node.floor}</span>
                                </div>
                                <div className='info_row_room'>
                                    <label>number: </label> <span>  {node.number}</span>
                                </div>
                            </div>
                            
                        )
                    }
                }else{
                    return (
                        <div className='room_card animated fadeIn' key={'ticket_room_' + node.ticketID} 
                        onClick={()=> this.props.openChangeModale(node)}>
                            <div className='info_row_room'>
                                <label>name: </label> <span>{node.name}</span>
                            </div>
                            <div className='info_row_room'>
                                <label>floor: </label> <span>  {node.floor}</span>
                            </div>
                            <div className='info_row_room'>
                                <label>number: </label> <span>  {node.number}</span>
                            </div>
                        </div>
                        
                    )
                }
            })
            return items
        }
    }

    renderSlecetOptions = ()=>{
        if(this.state.tickets){
            let options = this.state.tickets.map((node,index) =>{
                return(
                    <option key={index + "'_option"} value={node.ticketID}>{node.ticketNumber}</option>
                )
            })
            return options
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className='dropdown_menu_tickets'>
                    <select defaultValue='0' onChange={(e)=> this.filterRooms(e)}>
                        <option  value='0'> all devices</option>
                     {this.renderSlecetOptions()}
                    </select>
                </div>
                <div className='device_container'>
                    {this.renderItems()}
                </div>
            </React.Fragment>
        );
    }
}

