/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Alert, StyleSheet, View, Pressable, Image, Modal, ScrollView } from 'react-native';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import { Gasto } from './src/types';
import { generarId } from './src/helpers'
import ListadoGastos from './src/components/ListadoGastos';

const App = () => {

  const [ presupuesto, setPresupuesto ] = useState(0)
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)
  const [ gastos, setGastos ] = useState<Gasto[]>([])
  const [ modal, setModal ] = useState<Boolean>(false)
  const [ gasto, setGasto ] = useState<Gasto>({} as Gasto)

  const handleNuevoPresupuesto = (presupuesto: any) => {
    
    if( Number(presupuesto) <= 0 )
      return Alert.alert('Error', 'El presupuesto no puede ser igual o menor a 0', [{text: 'Aceptar'}])

    setIsValidPresupuesto(true)

  }

  const handleGasto = (gasto:Gasto) => {
    
    if( [gasto.nombre, gasto.cantidad, gasto.categoria].includes('') )
      return Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'Aceptar'}])

    if( gasto?.id ) {
      const nuevoGastos = gastos.map( item => item.id === gasto.id ? {...gasto} : item)
      setGastos(nuevoGastos)
    } else {
      setGastos([...gastos, {...gasto, id: generarId(), fecha: Date.now()}] as Array<Gasto>)
    }

    setModal(!modal)
      
  }

  const eliminarGasto = (id: string) => {

    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar', 
      [
        { text: 'No', style: 'cancel'},
        { text: 'Sí, eliminar', onPress: () => {
          const nuevoGastos = gastos.filter( item => item.id !== id && item )
          setGastos(nuevoGastos)
          setModal(!modal)
          setGasto({} as Gasto)
        }}
      ]
    )

  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>

      
        <View style={styles.header}>
          <Header />
          {
            isValidPresupuesto ?
              <ControlPresupuesto presupuesto={presupuesto} gastos={gastos}/> :
              <NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} handleNuevoPresupuesto={handleNuevoPresupuesto}/>
          }
        </View>
        {
          isValidPresupuesto && 
            <ListadoGastos gastos={gastos} setModal={setModal} setGasto={setGasto}/>
        }
      </ScrollView>
      {
        modal && 
          <Modal animationType='slide'>
            <FormularioGasto setModal={setModal} handleGasto={handleGasto} setGasto={setGasto} 
              gasto={gasto} eliminarGasto={eliminarGasto}/>
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
    backgroundColor: '#3B82F6',
    minHeight: 400
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
