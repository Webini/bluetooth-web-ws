const Agent = require('bluetooth/src/Agent');
const debug = require('./debug');
const { io } = require('./server');

class BluetoothAgent extends Agent {
  constructor(path) {
    super(path);
  }

  release() {
    debug('Agent released');
  }
  requestPinCode(device) {
    console.log('requestPinCode', device);
    // throw new Error('You must implement requestPinCode method');
  }
  displayPinCode(device, pin) {
    console.log('displayPinCode', device, pin);
    // throw new Error('You must implement displayPinCode method');
  }
  requestPasskey(device) {
    console.log('requestPasskey', device);
    // throw new Error('You must implement requestPasskey method');
  }
  displayPasskey(device, passKey, entered) {
    console.log('displayPasskey', device, passKey, entered);
    // throw new Error('You must implement displayPasskey method');
  }
  requestConfirmation(device, passKey) {
    console.log('requestConfirmation', device, passKey);
    // throw new Error('You must implement requestConfirmation method');
  }
  requestAuthorization(device) {
    console.log('requestAuthorization', device);
    // throw new Error('You must implement requestAuthorization method');
  }
  authorizeService(device, uuid) {
    console.log('authorizeService', uuid);
    // throw new Error('You must implement authorizeService method');
  }
  cancel() {
    throw new Error('You must implement cancel method');
  }

}

module.exports = BluetoothAgent;