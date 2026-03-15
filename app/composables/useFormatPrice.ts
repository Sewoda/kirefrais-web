export const useFormatPrice = () => {
    const format = (amount: number): string => {
        return new Intl.NumberFormat('fr-TG', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
        }).format(amount)
    }

    return { format }
}
