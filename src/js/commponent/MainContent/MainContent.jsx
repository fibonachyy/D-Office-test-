import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import UserCards from '../UsersContent/UserCards';
import { withRouter } from "react-router-dom";
import TicketCards from '../TicketsContent/TicketCards';
import ChnageTicketContent from '../TicketsContent/ChnageTicket';
import TicketDevices from '../TicketDevices/TicketDevices';
import TicketDeviceContent from '../TicketDevices/TicketDeviceModale';
class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modaleBox: false,
      modaleData: {}
    }
    this.handelModaleBox = this.handelModaleBox.bind(this);
    this.renderModaleContent = this.renderModaleContent.bind(this);
  }



  handelModaleBox = (data, modaleType) => {
    this.setState({
      modaleBox: true,
      modaleData: data ? data : {},
      modaleType: modaleType
    })
  }


  renderModaleContent = (type)=>{
    let modaleContent = ''
    if (type) {
      switch (type.toString().toLowerCase()) {
        case 'ticket':
          modaleContent = (
            <ChnageTicketContent
              data={this.state.modaleData}
              handelAction={() => this.handelModaleBox()}
            />
          )
          break;
        case 'device':
          modaleContent = (
            <TicketDeviceContent
              data={this.state.modaleData}
              handelAction={() => this.handelModaleBox()}
            />
          )
          break;
        default:
          modaleContent = ''
      }
    }
    return modaleContent
  }
  render() {

    
    

    return (
      <React.Fragment>
        <div className='main_content_container'>
          <Switch>
            <Route path="/users" render={() => <UserCards />} exact />
            <Route path="/tickets" render={() => <TicketCards openChangeModale={(data) => this.handelModaleBox(data, 'ticket')} />} exact />
            <Route path="/devices" render={() => <TicketDevices openChangeModale={(data) => this.handelModaleBox(data, 'device')} />} exact />
          </Switch>
        </div>
        <div
          className={this.state.modaleBox ? 'modalebox_container modalebox_container--active' : 'modalebox_container'}
          onClick={() => this.setState({ modaleBox: false })}
        >
          {this.renderModaleContent(this.state.modaleType)}
        </div>
      </React.Fragment>
    );
  }
}


export default withRouter(MainContent)