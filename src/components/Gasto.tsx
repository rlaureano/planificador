import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import globalStyles from '../styles'
import { Gasto as GastoType } from '../types'

type Props = {
    gasto: GastoType
}

const Gasto = ({gasto}:Props) => {

    const { nombre, cantidad, categoria, id } = gasto

  return (
    <View style={styles.contenedor}>
        <Text>{nombre}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    }
})

export default Gasto