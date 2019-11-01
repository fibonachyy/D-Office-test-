import React, { Component } from 'react';
import MainFetch from '../GlobalFetch';
import {apis} from '../../../configs/ConfigApi';
export default class UserCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users : []
        }
        this.renderItems = this.renderItems.bind(this);
    }
    componentDidMount() {
       this.setState({
           users: this.FetchData()
       }) 
    }

    FetchData = ()=>{

        MainFetch.get(apis.users,
            {},
            (data)=>{
                this.setState({
                    users: data
                })
            },
            (err)=>{
                console.log('err',err)
            } )
    }

    renderItems = () => {
        if(this.state.users){
            let items = this.state.users.map((node,index) => {
                return (
                    <div className='user_card animated fadeIn'
                     key={'user_' + node.id}
                     style={{animationDelay: `${index/ 10 * 2}s`}}
                     >
                        <span className='user_card_fileds'>
                            <label>Name: </label>
                        <h5> {node.name}</h5>
                        </span>
                        <span className='user_card_fileds'>
                            <label>Age: </label>
                            <h5> {node.Age}</h5>
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
                {this.renderItems()}
            </React.Fragment>
        );
    }
}
