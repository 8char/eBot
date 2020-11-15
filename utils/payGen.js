const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config({ path: '../' })

module.exports = {
    payGen: async (ammount, currency, payee) => {
        const clientId = process.env.CLIENTID;
        const clientSecret = process.env.SECRET;
        // This sample uses SandboxEnvironment. In production, use LiveEnvironment
        const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
        const client = new paypal.core.PayPalHttpClient(environment);
    
        // Construct a request object and set desired parameters
        // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
                                "intent": "CAPTURE",
                                "purchase_units": [
                                    {
                                        "amount": {
                                            "currency_code": currency,
                                            "value": ammount
                                        },
                                        "payee": {
                                          "email_address": payee
                                        }
                                    }
                                ]
                            });
        const response = await client.execute(request);
        const result = JSON.stringify(response.result.links[1].href)
        return result;
    }
}