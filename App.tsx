/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View
} from 'react-native';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';

const App = () => {

  const [ presupuesto, setPresupuesto ] = useState(0)
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)

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
            <ControlPresupuesto presupuesto={presupuesto}/> :
            <NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} handleNuevoPresupuesto={handleNuevoPresupuesto}/>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header: {
    backgroundColor: '#3B82F6'
  }
})

export default App;
