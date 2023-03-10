/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Pressable, Image, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import { Gasto } from './src/types';
import { generarId } from './src/helpers'
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';

const App = () => {

  const [ presupuesto, setPresupuesto ] = useState(0)
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)
  const [ gastos, setGastos ] = useState<Gasto[]>([])
  const [ modal, setModal ] = useState<Boolean>(false)
  const [ gasto, setGasto ] = useState<Gasto>({} as Gasto)
  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState<Gasto[]>([])

  useEffect( () => {

    const validPresupuestoAS = async () => {
      const presupuestoAS = await AsyncStorage.getItem('presupuesto') 
      
      if( presupuestoAS  ) {
        setPresupuesto( Number(presupuestoAS) )
        setIsValidPresupuesto(true)
      }
    } 

    const validaGastosAS = async () => {

      const gastoasAS = await AsyncStorage.getItem('gastos')

      if( gastoasAS ) {

        const newGastos = JSON.parse(gastoasAS)
        setGastos(newGastos)

      }
    }

    validPresupuestoAS()
    validaGastosAS()

  },[])

  useEffect( () => {

    if( isValidPresupuesto ) {

      const alamcenarPresupuesto =async () => {

        try {
          await AsyncStorage.setItem('presupuesto', String(presupuesto))
        } catch (err) {
          console.log(err)
        } 

      }

      alamcenarPresupuesto()
    }

  },[isValidPresupuesto])

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
      '??Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar', 
      [
        { text: 'No', style: 'cancel'},
        { text: 'S??, eliminar', onPress: () => {
          const nuevoGastos = gastos.filter( item => item.id !== id && item )
          setGastos(nuevoGastos)
          setModal(!modal)
          setGasto({} as Gasto)
        }}
      ]
    )

  }

  useEffect( () => {

    almacenarAS()

    if( !filtro ) {

      setGastosFiltrados(gastos)
      
    } else {

      const filtrados = gastos.filter( item => item.categoria === filtro )
  
      setGastosFiltrados(filtrados)
    }

  },[filtro, gastos])

  const almacenarAS = async () => {
    await AsyncStorage.setItem('gastos', JSON.stringify(gastos))
  }

  const reiniciarApp = async () => {
    Alert.alert(
      "??Deseas reiniciar la app?",
      "Esto eliminar?? presupuesto y gastos",
      [ {text: 'Cancelar'}, {text: 'S??, reiniciar', onPress: async () => {
        await AsyncStorage.clear()
        setPresupuesto(0)
        setIsValidPresupuesto(false)
        setGastos([])
      }}]
    )
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>

      
        <View style={styles.header}>
          <Header />
          {
            isValidPresupuesto ?
              <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} reiniciarApp={reiniciarApp}/> :
              <NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} handleNuevoPresupuesto={handleNuevoPresupuesto}/>
          }
        </View>
        {
          isValidPresupuesto && 
            <>
              <Filtro setFiltro={setFiltro} filtro={filtro}/>
              <ListadoGastos gastosFiltrados={gastosFiltrados} setModal={setModal} setGasto={setGasto}/>
            </>
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
