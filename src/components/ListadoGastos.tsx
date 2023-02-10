import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Gasto from './Gasto'
import { Gasto as GastoType } from '../types'

type Props = {
    gastos: GastoType[]
}

const ListadoGastos = ({gastos}:Props) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Gastos</Text>
            {
                !gastos?.length ? (
                    <Text>No hay gastos</Text>
                ) : (
                    gastos.map( gasto => 
                        <Gasto gasto={gasto}/>
                    )
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 70
    },
    titulo: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default ListadoGastos
