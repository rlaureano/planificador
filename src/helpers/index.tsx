export const formatearCantidad = (cantidad: number) => 
    cantidad.toLocaleString('en-Us', {
        style: 'currency',
        currency: 'USD'
    })

export const generarId = () => 
    Math.random().toString(36).substring(2,11) + Date.now().toString(36)
