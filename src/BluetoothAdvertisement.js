const Advertisement = require('bluetooth/src/Advertisement');
const services = require('bluetooth/src/struct/services');

class BluetoothAdvertisement extends Advertisement {
  constructor(path) {
    super(path);

    this.type = 'broadcast';

    this.serviceUUIDs = [
      services.AdvancedAudioDistribution,
      services.AudioSource,
      services.HandsfreeAudioGateway,
      services.Handsfree
    ];

    this.appearance = 640;    
    this.duration = 0;
    this.timeout = 0;
  }

  release() {}
}

module.exports = BluetoothAdvertisement;