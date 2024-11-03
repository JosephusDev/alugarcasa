export function formatar(valor: number){
    return new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor)
}