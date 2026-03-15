export const usePayment = () => {
    const config = useRuntimeConfig()
    const { api } = useApi()

    const payWithCinetPay = async (orderId: number) => {
        try {
            // 1. Get payment data from backend
            const { transaction_id, amount, currency, description, customer_name, customer_email, customer_phone } = await api<any>('/payment/initiate', {
                method: 'POST',
                body: { order_id: orderId }
            })

            // 2. Open CinetPay logic (assuming script is loaded)
            // This is a simplified version. Usually one would load the script in nuxt.config.ts or via a plugin.
            if (typeof (window as any).CinetPay === 'undefined') {
                throw new Error('CinetPay SDK not found')
            }

            const checkout = new (window as any).CinetPay()
            checkout.setConfig({
                apikey: config.public.cinetpayApiKey,
                site_id: config.public.cinetpaySiteId,
                notify_url: `${config.public.apiBase}/payment/webhook`,
                mode: 'PRODUCTION' // or 'SANDBOX'
            })

            checkout.getCheckout({
                transaction_id,
                amount,
                currency,
                channels: 'ALL',
                description,
                customer_name,
                customer_email,
                customer_phone_number: customer_phone,
                return_url: `${window.location.origin}/confirmation?order_id=${orderId}`,
                wait_response: true,
            })

            checkout.waitResponse((data: any) => {
                if (data.status === 'REFUSED') {
                    toast.error('Paiement refusé.')
                } else if (data.status === 'ACCEPTED') {
                    toast.success('Paiement accepté !')
                    navigateTo('/confirmation')
                }
            })

        } catch (err: any) {
            console.error('Payment Error:', err)
            throw err
        }
    }

    return {
        payWithCinetPay
    }
}
