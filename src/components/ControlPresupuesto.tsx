import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { formatearCantidad } from '../helpers'
import globalStyles from '../styles'

type Props = {
    presupuesto: number,
    gastos: Array<any>
}

const ControlPresupuesto = ({presupuesto, gastos}: Props) => {

    const [ disponible, setDisponible ] = useState(0)
    const [ gastado, setGastado ] = useState(0)

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, {cantidad}) => total + Number(cantidad) , 0)
        const totalDisponible = presupuesto - totalGastado
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [])

    return (
        <View style={styles.contenedor}>
            <View style={styles.centrarGrafica}>
                <Image style={styles.imagen} 
                    source={require('../img/grafico.jpg')}/>
            </View>

            <View style={styles.contenedorTexto}>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Presupuesto: {''}</Text> {formatearCantidad(Number(presupuesto))}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Disponible: {''}</Text> {formatearCantidad(Number(disponible))}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Gastado: {''}</Text> {formatearCantidad(Number(gastado))}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    },
    centrarGrafica: {
        alignItems: 'center',
    },
    imagen: {
        width: 250,
        height: 250
    },
    contenedorTexto: {
        marginTop: 50,
    },
    valor: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    label: {
        fontWeight: '700',
        color: '#3B82F6'
    }
})

export default ControlPresupuesto