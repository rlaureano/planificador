export const formatearCantidad = (cantidad: number) => 
    cantidad.toLocaleString('en-Us', {
        style: 'currency',
        currency: 'USD'
    })

export const generarId = () => 
    Math.random().toString(36).substring(2,11) + Date.now().toString(36)

export const formatearFecha = (fecha: number) => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones as any)
}
    
