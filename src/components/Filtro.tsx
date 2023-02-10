import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'

type Props = {
    setFiltro: (val: string) => void,
    filtro: string
}

const Filtro = ({setFiltro, filtro}:Props) => {

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Filtro Gastos</Text>
            <Picker
                selectedValue={filtro}
                onValueChange={setFiltro}
            >
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
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
        transform: [{ translateY: 0 }],
        marginTop: 80
    },
    label: {
        fontSize: 22,
        fontWeight: '900',
        color: '#64748b'
    }
})

export default Filtro