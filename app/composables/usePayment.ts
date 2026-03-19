export const usePayment = () => {
    const config = useRuntimeConfig()
    const { api } = useApi()

    const payWithLeekPay = async (orderId: number) => {
        try {
            // 1. Get payment data from backend
            const { payment_url } = await api<any>(`/payments/initiate/${orderId}`, {
                method: 'POST'
            })

            // 2. Redirect to LeekPay
            if (payment_url) {
                window.location.href = payment_url
            }

        } catch (err: any) {
            console.error('Payment Error:', err)
            throw err
        }
    }

    return {
        payWithLeekPay
    }
}
