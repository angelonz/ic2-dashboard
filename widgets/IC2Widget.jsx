import React from 'react';
import BaseWidget from './widget.jsx';

class IC2Widget extends BaseWidget {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title, 
      status: 404,
      class: 'status_404',
      stateCycleCount: 0 
    };
  }

  updateState(payload) {
    console.log('updating state...');
    if (payload.status === 200) {
      payload.class = '';
      
    } else if (payload.status === 500) {
      payload.class = 'status_warning';
      
    } else {
      payload.class = 'status_404';
    }
    
    this.setState(payload);
  }

  render() {
    
    let cycleCount = null;
    let timeFirstOccured = null;

    if (this.state.stateCycleCount > 0) {
      cycleCount = <h3>Refresh cycle since first occured: {this.state.stateCycleCount}</h3>
      timeFirstOccured = <h3>Since: {this.state.timeFirstOccured}</h3>
    }

    return (
      <div className={this.props.name + " widget w" + this.props.width + " h" + this.props.height + " " + this.state.class}>
        <h1>{this.state.title}</h1>
        <h1>{this.state.status}</h1>
        <h1>{this.state.time}</h1>
        {cycleCount}
        {timeFirstOccured}
      </div>
    );
  }
}

export default IC2Widget;
