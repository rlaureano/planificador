/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Alert, StyleSheet, View, Pressable, Image, Modal } from 'react-native';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';

const App = () => {

  const [ presupuesto, setPresupuesto ] = useState(0)
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)
  const [ gastos, setGastos ] = useState([])
  const [ modal, setModal ] = useState(false)

  const handleNuevoPresupuesto = (presupuesto: any) => {
    
    if( Number(presupuesto) <= 0 )
      return Alert.alert('Error', 'El presupuesto no puede ser igual o menor a 0', [{text: 'Aceptar'}])

    setIsValidPresupuesto(true)

  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <Header />
        {
          isValidPresupuesto ?
            <ControlPresupuesto presupuesto={presupuesto} gastos={gastos}/> :
            <NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} handleNuevoPresupuesto={handleNuevoPresupuesto}/>
        }
      </View>
      {
        modal && 
          <Modal visible={modal} animationType='slide'>
            <FormularioGasto setModal={setModal}/>
          </Modal>
      }
      {
        isValidPresupuesto &&
          <Pressable onPress={() => setModal(!modal) } style={styles.presable}>
            <Image style={styles.imagen} source={require('./src/img/nuevo-gasto.png')}/>
          </Pressable>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    position: 'relative'
  },
  header: {
    backgroundColor: '#3B82F6'
  },
  presable: {
    position: 'absolute',
    right: 30,
    bottom: 30
  },
  imagen: {
    width: 40,
    height: 40,
  }
})

export default App;
