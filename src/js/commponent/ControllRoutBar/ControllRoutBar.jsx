import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
class ControllRoutBar extends Component {
  constructor(props) {
    super(props)
    this.checkPath = this.checkPath.bind(this);
  }




  checkPath = (path) => {
    if (path === this.props.location.pathname)
      return true
    else
      return false
  }
  render() {
    return (
      <React.Fragment>
        <div className='controllBar_container'>

          <div className={this.checkPath('/users') ? 'change_router_btn--active' : 'change_router_btn'}>
            <Link to={'/users'}>
              <span className="fix_width_height">Users</span>
            </Link>
          </div>


          <div className={this.checkPath('/tickets') ? 'change_router_btn--active' : 'change_router_btn'}>
            <Link to={'/tickets'}>
              <span className="fix_width_height">Tickets</span>
            </Link>
          </div>
          <div className={this.checkPath('/devices') ? 'change_router_btn--active' : 'change_router_btn'}>
            <Link to={'/devices'}>
              <span className="fix_width_height">Devices</span>
            </Link>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ControllRoutBar)