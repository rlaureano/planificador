import React, { useState, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
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
    const [ porcentaje, setPorcentaje ] = useState(0)

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, {cantidad}) => total + Number(cantidad) , 0)
        const totalDisponible = presupuesto - totalGastado
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setPorcentaje( 100 - (totalDisponible / presupuesto * 100) )
    }, [gastos])

    return (
        <View style={styles.contenedor}>
            <View style={styles.centrarGrafica}>
                <CircularProgress value={porcentaje} 
                    radius={150}
                    valueSuffix={'%'}
                    title="Gastado"
                    inActiveStrokeColor='#f5f5f5'
                    inActiveStrokeWidth={20}
                    activeStrokeColor={'#3b82f6'}
                    activeStrokeWidth={20}
                    titleStyle={{ fontWeight: 'bold', fontSize: 20}}
                    titleColor='#64748B'
                />
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