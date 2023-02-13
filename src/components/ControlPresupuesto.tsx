import React, { useState, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Text, View, Pressable, StyleSheet } from 'react-native'
import { formatearCantidad } from '../helpers'
import globalStyles from '../styles'

type Props = {
    presupuesto: number,
    gastos: Array<any>,
    reiniciarApp: () => void
}

const ControlPresupuesto = ({presupuesto, gastos, reiniciarApp}: Props) => {

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
                <Pressable style={styles.boton} onPress={reiniciarApp}>
                    <Text style={styles.textoBoton}>Reinicar App</Text>
                </Pressable>
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
    boton: {
        backgroundColor: '#BD2777',
        padding: 10, 
        marginBottom: 40,
        borderRadius: 5
    },
    textoBoton: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
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