export const formatearCantidad = (cantidad: number) => 
    cantidad.toLocaleString('en-Us', {
        style: 'currency',
        currency: 'USD'
    })
