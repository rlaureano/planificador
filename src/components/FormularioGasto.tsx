import React from 'react'
import { SafeAreaView, Text, View, TextInput, StyleSheet, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'

type Props = {
    setModal: (val: boolean) => void
}

const FormularioGasto = ({setModal}:Props) => {
  return (
    <SafeAreaView style={styles.contenedor}>
        
        <View>
            <Pressable style={styles.btnCancelar} onLongPress={ () => setModal(false)}>
                <Text style={styles.btnCancelarText}>Cancelar</Text>
            </Pressable>
        </View>

        <View style={styles.formulario}>

            <Text style={styles.titulo}>Nuevo Gasto</Text>

            <View style={styles.campo}>
                <Text style={styles.label}>Nombre Gasto</Text>
                <TextInput style={styles.input} placeholder='Nombre del gasto'/>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Cantidad Gasto</Text>
                <TextInput style={styles.input} placeholder='Cantidad del gasto' keyboardType='numeric'/>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Categoría Gasto</Text>
                <Picker>
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
            <Pressable style={styles.submitBtn}>
                <Text style={styles.submitBtnTexto}>Agregar Gasto</Text>
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
    btnCancelar: {
        backgroundColor: '#DD2777',
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10
    },
    btnCancelarText: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF'
    },
    formulario: {
        ...globalStyles.contenedor
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