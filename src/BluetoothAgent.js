const Agent = require('bluetooth/src/Agent');
const debug = require('./debug');

class BluetoothAgent extends Agent {
  constructor(path) {
    console.log('BT agent', path);
    super(path);
  }
  release() {
    debug('Agent released');
  }
  requestPinCode(device) {
    console.log('requestPinCode', device);
    return 1234;
    // throw new Error('You must implement requestPinCode method');
  }
  displayPinCode(device, pin) {
    console.log('displayPinCode', device, pin);
    // throw new Error('You must implement displayPinCode method');
  }
  requestPasskey(device) {
    console.log('requestPasskey', device);
    return 1234;
    // throw new Error('You must implement requestPasskey method');
  }
  displayPasskey(device, passKey, entered) {
    console.log('displayPasskey', device, passKey, entered);
    // throw new Error('You must implement displayPasskey method');
  }
  requestConfirmation(device, passKey) {
    debug('requestConfirmation', device, passKey);
  }
  requestAuthorization(device) {
    debug('requestAuthorization', device);
    // throw new Error('You must implement requestAuthorization method');
  }
  authorizeService(device, uuid) {
    debug('authorizeService', uuid);
    // throw new Error('You must implement authorizeService method');
  }
  cancel() {
    throw new Error('You must implement cancel method');
  }

}

module.exports = BluetoothAgent;