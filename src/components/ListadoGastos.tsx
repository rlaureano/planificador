import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Gasto from './Gasto'
import { Gasto as GastoType } from '../types'

type Props = {
    gastosFiltrados: GastoType[],
    setModal: (value: Boolean) => void,
    setGasto: (value: GastoType) => void
}

const ListadoGastos = ({gastosFiltrados, setModal, setGasto}:Props) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Gastos</Text>
            {
                !gastosFiltrados?.length ? (
                    <Text style={styles.noGasto}>No hay gastos</Text>
                ) : (
                    gastosFiltrados.map( gasto => 
                        <Gasto gasto={gasto} key={gasto?.id} setModal={setModal} setGasto={setGasto}/>
                    )
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 30,
        marginBottom: 100
    },
    titulo: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 30
    },
    noGasto: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
})

export default ListadoGastos
