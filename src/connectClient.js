const manager = require('bluetooth');
const errorHandler = require('./errorHandler');
const handlePromise = errorHandler.handlePromise;
const { io } = require('./server');

module.exports = function(socket) {
  Object
    .values(manager.getObjects())
    .reduce(async (prev, object) => {
      await prev;
      if (!object.isAdapter && !object.isDevice) {
        return;
      }
      const eventName = (object.isAdapter ? 'adapter' : 'device');
      socket.emit(`${eventName}-add`, object.name, await object.properties.getAll());
    }, Promise.resolve())
    .catch(errorHandler)
  ;

  socket.on('setPairable', handlePromise(async (adapterName) => {
    const object = manager.getObject(adapterName);
    if (object && object.isAdapter) {
      await object.adapter.setPairable(true);
    }
  }));

  socket.on('connectDevice', handlePromise(async (deviceName) => {
    const object = manager.getObject(deviceName);
    if (!object || !object.isDevice) {
      return;
    }

    const { device } = object; 
    io.emit('device-changed', deviceName, { Connecting: true });

    try {
      if (!await device.getPaired()) {
        await device.pair();
      } else {
        await device.connect();
      }
    } catch(e) {
      if (e[0] && e[0] === 'Host is down') {
        return;
      }
      throw e;
    } finally {
      io.emit('device-changed', deviceName, { Connecting: false });
    }
  }));

  socket.on('disconnectDevice', handlePromise(async (deviceName) => {
    const object = manager.getObject(deviceName);
    if (object && object.isDevice) {
      await object.device.disconnect();
    }
  }));
  
  socket.on('removeDevice', handlePromise(async (deviceName) => {
    const object = manager.getObject(deviceName);
    if (!object || !object.isDevice) {
      return;
    }

    const adapterName = await object.device.getAdapter();
    const adapterobject = manager.getObject(adapterName);
    if (!adapterobject || !adapterobject.isAdapter) {
      return;
    }
    
    await adapterobject.adapter.removeDevice(deviceName);
  }));
};