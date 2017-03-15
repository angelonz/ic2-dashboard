import React from 'react';
import ReactDOM from 'react-dom';
import IC2Widget from '../widgets/IC2Widget'
import Packery from 'packery';

import "../styles/default.scss";
import "../widgets/ic2widget.scss";



ReactDOM.render(
  <div id="dashboard">
    <IC2Widget name="treis" title="TREIS Feed" width="2"/>
    <IC2Widget name="tmp" title="Traffic Management Plan Feed" width="2"/>
    <IC2Widget name="ssdf" title="SSDF Feed" width="2"/>
    <IC2Widget name="signs" title="SIGNS Feed" width="2"/>
    <IC2Widget name="cameras" title="CAMERAS Feed" width="2"/>
    <IC2Widget name="congestion" title="Traffic Conditions Feed" width="2"/>
  </div>,
  document.getElementById('content')
);

new Packery("#dashboard", {itemSelector: ".widget", gutter: 10});