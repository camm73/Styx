import React, {Component} from 'react';
import { Platform, View, Text, Alert} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';
import { Button } from 'react-native-elements';
import base64 from 'react-native-base64';

class BLEComponent extends Component{

    constructor(){
        super();
        this.manager = new BleManager()
        this.state = {info: "", values: {}}
        this.uuid = "1ed0"
        this.device = null
        this.ledEnabled = false
        this.characteristics = {
          0: "LED",
        }
    }

      serviceUUID(){
        return "1ed1"
      }

      writeUUID() {
        return "1ed2"
      }

      info(message) {
        this.setState({info: message})
      }
    
      error(message) {
        this.setState({info: "ERROR: " + message})
      }
    
      updateValue(key, value) {
        this.setState({values: {...this.state.values, [key]: value}})
      }

      componentWillMount() {
        if (Platform.OS === 'ios') {
          this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') this.scanAndConnect()
          })
        } else {
          this.scanAndConnect()
        }
      }

      scanAndConnect() {
        this.manager.startDeviceScan(null,
                                     null, (error, device) => {
          this.info("Scanning...")
          console.log(device)
    
          if (error) {
            this.error(error.message)
            return
          }
    
          if (device.name === 'Styx Pax') {
            this.device = device;
            this.info("Connecting to PAX")
            this.manager.stopDeviceScan()
            device.connect()
              .then((device) => {
                this.info("Discovering services and characteristics")
                return device.discoverAllServicesAndCharacteristics()
              }).then((device) => {
                this.info("Writing");
                device.writeCharacteristicWithResponseForService('1ed1', '1ed2', 'MQ==') //MA== (0x30)  MQ== (0x31)
                  .then((characteristic) => {
                    this.info(characteristic.value);
                    this.ledEnabled = true;
                    return
                  })
              }), (error) => {
                this.error(error.message);
              }
          }
        });
      }

      toggleLight(){
        if(this.ledEnabled === true){
          this.device.writeCharacteristicWithResponseForService('1ed1', '1ed2', "MA==");
          this.ledEnabled = false;
        }else{
          this.device.writeCharacteristicWithResponseForService('1ed1', '1ed2', "MQ==");
          this.ledEnabled = true;
        }
        
      }

      readLight(){
        this.device.readCharacteristicForService('1ed1', '1ed2').then(characteristic => console.log(base64.decode(characteristic.value)));
      }

      render() {
        return (
          <View>
            <Text>{this.state.info}</Text>
            <Button 
            onPress={() => {
              this.toggleLight();
            }}
            title="Toggle LED"
            disabled={false}/>

            <Button 
            onPress={() => {
              this.readLight();
            }}
            title="READ LED"
            disabled={false}/>
          </View>
        )
      }
    
}

export default BLEComponent;