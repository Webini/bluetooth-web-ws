const manager = require('bluetooth');
const BluetoothAdvertisement = require('./BluetoothAdvertisement');
const BluetoothAgent = require('./BluetoothAgent');
const AgentManager = require('bluetooth/src/AgentManager');
const caps = require('bluetooth/src/AgentCapabilities');
const { io } = require('./server');
const { handlePromise } = require('./errorHandler');

async function initAdapter(object) {
  await object.adapter.setDiscoverableTimeout(0);
  await object.adapter.setDiscoverable(true);
  await object.adapter.setPairable(false);
  await object.adapter.setPairableTimeout(120);
  await object.adapter.setAlias(process.env.BLUETOOTH_NAME || 'NodeBluetooth');
  await object.adapter.setPowered(true);

  const advertisement = new BluetoothAdvertisement();
  await object.advertising.registerAdvertisement(advertisement);

  io.emit('adapter-add', object.name, await object.properties.getAll());
  object.properties.on('changed', values => {
    io.emit('adapter-changed', object.name, values);
  });
}

async function initDevice(object) {
  io.emit('device-add', object.name, await object.properties.getAll());
  object.properties.on('changed', values => {
    io.emit('device-changed', object.name, values);
  });
}

function onObjectRemoved(object) {
  if (object.isDevice) {
    io.emit('device-removed', object.name);
  } else if(object.isAdapter) {
    io.emit('adapter-removed', object.name);
  }
}

module.exports = {
  initialize: handlePromise(async () => {
    manager.on('new', handlePromise(async (object) => {
      if (object.isAdapter) {
        await initAdapter(object);
      } else if (object.isDevice) {
        await initDevice(object);
      }
    }));
    
    manager.on('removed', (object) => {
      onObjectRemoved(object);
    });
    
    const agent = new BluetoothAgent();
    await AgentManager.registerAgent(agent, caps.keyboardDisplay);
    await AgentManager.requestDefaultAgent(agent);
    await manager.initialize();
  })
};