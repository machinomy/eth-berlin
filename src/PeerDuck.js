import React, { Component } from 'react';
import logo from './spinner.png';
import './App.css';
import Hls from 'hls.js'
import Contract from './Contract'

const contractAbi = require('./LedgerChannel.json').abi

const contractAddress = '0xb80996993505eb2d95efb775333b1a5c2708086f'
const ingridAddress = '0x8ec75ef3adf6c953775d0738e0e7bd60e647e5ef'

const STREAM_ID = 'd8072aae72b84c63f1136e6a525dfef04e2ca5f39f232874da4a4a45372b2ebd'
const SOURCE = 'http://localhost:8935/stream/' + STREAM_ID + '.m3u8'

class PeerDuck extends Component {
  constructor( ) {
    super()
    this.contract = new Contract()
      this.state = {

      }
  }

  async handleStartShow () {
      let txId = await this.contract.createChannel()
      console.log(txId)
  }

  render() {
    return (
      <div className="PeerDuck">
          <h1 className="center">PeerDuck</h1>
          <div style={{marginTop: '20%'}}>
          <a onClick={this.handleStartShow.bind(this)} id="mainButton" className="button is-primary is-focused center image">Start the show</a>
          </div>
      </div>
    );
  }
}

export default PeerDuck;
