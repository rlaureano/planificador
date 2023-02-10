import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { formatearCantidad } from '../helpers'
import globalStyles from '../styles'
import { Gasto as GastoType } from '../types'

type Props = {
    gasto: GastoType
}

const diccionarioIconos: any  = {
    ahorro: require('../img/icono_ahorro.png'),
    comida: require('../img/icono_comida.png'),
    casa: require('../img/icono_casa.png'),
    gastos: require('../img/icono_gastos.png'),
    ocio: require('../img/icono_ocio.png'),
    salud: require('../img/icono_salud.png'),
    suscripciones: require('../img/icono_suscripciones.png')
}

const Gasto = ({gasto}:Props) => {

    const { nombre, cantidad, categoria, id } = gasto

    return (
        <View style={styles.contenedor}>
            <View>
                <Image source={diccionarioIconos[categoria]}/>
                <View>
                    <Text>{categoria}</Text>
                    <Text>{nombre}</Text>
                </View>
            </View>
            <Text>{formatearCantidad(Number(cantidad))}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
        marginBottom: 10
    }
})

export default Gasto