import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, TextInput, StyleSheet, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'
import { Gasto } from '../types'

type Props = {
    setModal: (val: boolean) => void,
    handleGasto: (val: Gasto) => void,
    setGasto: (val: Gasto) => void,
    gasto: Gasto,
    eliminarGasto: (val: string) => void
}

const FormularioGasto = ({setModal, handleGasto, setGasto, gasto, eliminarGasto}:Props) => {

    const [ nombre, setNombre ] = useState('')
    const [ cantidad, setCantidad ] = useState('')
    const [ categoria, setCategoria ] = useState('')
    const [ id, setId ] = useState('')

    useEffect( () => {

        if( gasto?.id ) {
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
            setId(gasto.id)
        }

    }, [gasto])

  return (
    <SafeAreaView style={styles.contenedor}>
        
        <View style={styles.contenedorBotones}>
            <Pressable style={[styles.btn, styles.btnCancelar]} onPress={ () => { setModal(false), setGasto({} as Gasto)}}>
                <Text style={styles.btnTexto}>Cancelar</Text>
            </Pressable>

            {
                gasto?.id &&
                    <Pressable style={[styles.btn, styles.btnEliminar]} onPress={ () => {eliminarGasto(id)}}>
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
            }
        </View>

        <View style={styles.formulario}>

            <Text style={styles.titulo}>{ gasto?.id ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>

            <View style={styles.campo}>
                <Text style={styles.label}>Nombre Gasto</Text>
                <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder='Nombre del gasto'/>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Cantidad Gasto</Text>
                <TextInput style={styles.input} value={cantidad} onChangeText={setCantidad} placeholder='Cantidad del gasto' keyboardType='numeric'/>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Categoría Gasto</Text>
                <Picker selectedValue={categoria} onValueChange={ (itemValue:string) => setCategoria(itemValue)}>
                    <Picker.Item label="-- Selecciona --" value=""/>
                    <Picker.Item label="Ahorro" value="ahorro"/>
                    <Picker.Item label="Comida" value="comida"/>
                    <Picker.Item label="Casa" value="casa"/>
                    <Picker.Item label="Gastos varios" value="gastos"/>
                    <Picker.Item label="Ocio" value="ocio"/>
                    <Picker.Item label="Salud" value="salud"/>
                    <Picker.Item label="Suscripciones" value="suscripciones"/>
                </Picker>
            </View>
            <Pressable style={styles.submitBtn} onPress={ () => handleGasto({nombre, cantidad, categoria, id, fecha: gasto.fecha} as Gasto)}>
                <Text style={styles.submitBtnTexto}>{ gasto?.id ? 'Guargar Cambios Gasto' : 'Agregar Gasto'}</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#1E40AF',
        flex: 1
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1
    },
    btnCancelar: {
        backgroundColor: '#DD2777'
    },
    btnEliminar: {
        backgroundColor: 'red'
    },
    btnTexto: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF'
    },
    formulario: {
        ...globalStyles.contenedor,
    },
    titulo: {    
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748B'
    },
    campo: {
        marginVertical: 10,
    },
    label: {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20
    },
    submitBtnTexto: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

})

export default FormularioGasto