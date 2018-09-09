const TX = require('ethereumjs-tx')
const Web3 = require('web3')
const contractAbi = require('./LedgerChannel.json').abi

const contractAddress = '0xb80996993505eb2d95efb775333b1a5c2708086f'
const ingridAddress = '0x8ec75ef3adf6c953775d0738e0e7bd60e647e5ef'
const ingridKey = '0xf0f18fd1df636821d2d6a04b4d4f4c76fc33eb66c253ae1e4028bf33c48622bc'

function hexToBuffer(hexString) {
    return new Buffer(hexString.substr(2, hexString.length), 'hex')
}

function bufferToHex(buffer) {
    return '0x' + buffer.toString('hex')
}

export default class Contract {
    constructor () {
        window.web3.eth.getAccounts((err, ac) => {
            this.masterAccount = ac[0]
            // init contract
            this.web3 = window.web3
            this.contract = this.web3.eth.contract(contractAbi).at(contractAddress)
        })
        window.delegateWeb3.eth.getAccounts((err, ac) => {
            this.delegateWeb3 = window.delegateWeb3
            this.delegateAccount = ac[0]
        })
        this.masterAccount = '0x'
        this.delegateAccount = '0x'
    }

    async createChannel ()  {
        const lcId = Web3.utils.sha3('1111' + Math.random(), {encoding: 'hex'})
        console.log('lcId', lcId)//0xb042c1d41af331615fcce63f7aecae8a608ccbf200eeb71b9586fd83c35a1453
        const balances = [Web3.utils.toWei('0.05'), '0']
        console.log('balances', balances)
        return new Promise((resolve, reject) => {
            this.contract.createChannel(
                lcId,
                ingridAddress,
                '0',
                '0',
                balances,
                {from: this.masterAccount, value: Web3.utils.toWei('0.05')},
                (err, tx) => {
                    console.error(err)
                    err ? reject(err) : resolve(tx)
                }
            )
        })
    }

    async joinChannel () {
        const lcId = '0xb042c1d41af331615fcce63f7aecae8a608ccbf200eeb71b9586fd83c35a1453'
        const callData = this.contract['joinChannel'].getData(lcId,
            [Web3.utils.toWei('0.05'), '0'])

        console.log('callData', callData)
        this.web3.eth.getTransactionCount(ingridAddress, async (err, nonce) => {
            const rawTx = {
                nonce: await this.web3.toHex(nonce),
                gasPrice: await this.web3.toHex(Web3.utils.toWei('0.000000005')),
                gasLimit: await this.web3.toHex(250000),
                to: contractAddress,
                value: await this.web3.toHex(Web3.utils.toWei('0.05')),
                data: callData,
                from: ingridAddress
            }
            console.log('rawTx', rawTx)
            const tx = new TX(rawTx)
            tx.sign(hexToBuffer(ingridKey))
            const serialziedData = tx.serialize()
            this.web3.eth.sendRawTransaction(bufferToHex(serialziedData), (err, res) => {
                console.error(err)
                console.log(res)
                this.web3.eth.getTransactionReceipt(res, (err, receipt) => console.log(receipt))
            })

        })
    }
}