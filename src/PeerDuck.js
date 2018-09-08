import React, { Component } from 'react';
import logo from './spinner.png';
import './App.css';
import Hls from 'hls.js'

const contractAbi = require('./LedgerChannel.json').abi

const contractAddress = '0xb80996993505eb2d95efb775333b1a5c2708086f'
const ingridAddress = '0x8ec75ef3adf6c953775d0738e0e7bd60e647e5ef'

const STREAM_ID = 'd8072aae72b84c63f1136e6a525dfef04e2ca5f39f232874da4a4a45372b2ebd'
const SOURCE = 'http://localhost:8935/stream/' + STREAM_ID + '.m3u8'

class PeerDuck extends Component {
  constructor( ) {
    super()
    window.delegateWeb3 = window.web3
    window.web3.eth.getAccounts((err, ac) => {
      this.setState({ masterAccount: ac[0] })
      // init contract
      this.web3 = window.web3
      this.contract = this.web3.eth.contract(contractAbi).at(contractAddress)
    })
    window.delegateWeb3.eth.getAccounts((err, ac) => {
      this.delegateWeb3 = window.delegateWeb3
      this.setState({ delegateAccount: ac[0] })
    })
    this.state = {
      masterAccount: '0x',
      delegateAccount: '0x',
        videoStyle: {display: 'hidden'}
    }
    this.videoRef = React.createRef()
  }

  registerDelegateKey = async () => {
    let tx = await new Promise((resolve, reject) => {
      this.contract.registerDelegateKey(this.state.delegateAccount, { from: this.state.masterAccount }, (err, tx) => {
        err ? reject(err) : resolve(tx)
      })
    })
    console.log(tx)
      this.setState({
          videoStyle: {display: 'block'}
      })
  }

  componentDidMount () {
      if(Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(SOURCE);
          hls.attachMedia(this.videoRef.current);
      }
  }

  handlePlay () {
      let video = this.videoRef.current
      video.play()
  }

  render() {
    return (
      <div className="PeerDuck">
          <h1 className="center">PeerDuck</h1>
          <img src={logo} className="App-logo image" alt="logo" />
          <a onclick="document.getElementById('mainButton').remove();" id="mainButton" className="button is-primary is-focused center image">Start the show</a>
      </div>
    );
  }
}

export default PeerDuck;
