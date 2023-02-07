import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import globalStyles from '../styles'

type Props = {
    handleNuevoPresupuesto: (value: number) => void,
    presupuesto: number,
    setPresupuesto: (value: number) => void
}

const NuevoPresupuesto = ({handleNuevoPresupuesto, presupuesto, setPresupuesto}: Props) => {

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Nuevo Presupuesto</Text>

            <TextInput 
                keyboardType='numeric' 
                placeholder='Agrega tu presupuesto' 
                style={styles.input} 
                value={presupuesto.toString()} 
                onChangeText={ (val: any) => setPresupuesto(val)}
            /> 

            <Pressable style={styles.boton} onPress={ () => handleNuevoPresupuesto(presupuesto)}>
                <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
            </Pressable>    
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3d82f6'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    boton: {
        marginTop: 30,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10
    },
    botonTexto: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default NuevoPresupuesto