export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { num } = req.query;

    if (!num) {
        return res.status(400).json({ error: "Phone number (num) is required" });
    }

    try {
        // ========================= Lazz Pharma API Request ==========================
        const urlLazzPharma = "https://www.lazzpharma.com/MessagingArea/OtpMessage/WebRegister";
        const dataLazzPharma = JSON.stringify({
            "ActivityId": "a8d63674-a00d-4c6d-9be0-4f60b70ec194",
            "Phone": num
        });

        const headersLazzPharma = {
            "Host": "www.lazzpharma.com",
            "Access-Control-Allow-Origin": "*",
            "Sec-CH-UA": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
            "Content-Type": "application/json",
            "Sec-CH-UA-Mobile": "?1",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36",
            "Sec-CH-UA-Platform": "\"Android\"",
            "Accept": "*/*",
            "Origin": "https://www.lazzpharma.com",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://www.lazzpharma.com/",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9"
        };

        const lazzPharmaResponse = await fetch(urlLazzPharma, {
            method: "POST",
            headers: headersLazzPharma,
            body: dataLazzPharma
        });

        const lazzPharmaResult = await lazzPharmaResponse.json();

        // ========================= Shwapno API Request ==========================
        const urlShwapno = "https://store-api.shwapno.com/en/api/customer/login";
        const dataShwapno = JSON.stringify({ phoneNumber: num });

        const headersShwapno = {
            "User-Agent": "shwapno.flutter",
            "Accept-Encoding": "gzip",
            "NST": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "Client-Type": "App",
            "Host": "store-api.shwapno.com",
            "Content-Type": "application/json",
            "Customer": "f7f1ffa2-1200-48e5-9434-b55da46a8981",
            "Device-Type": "Mobile",
            "AppDeviceToken": "f7f1ffa2-1200-48e5-9434-b55da46a8981"
        };

        const shwapnoResponse = await fetch(urlShwapno, {
            method: "POST",
            headers: headersShwapno,
            body: dataShwapno
        });

        const shwapnoResult = await shwapnoResponse.json();

        // ========================= Badhan API Request ==========================
        const urlBadhan = "https://badhan-api.stylezworld.net/api/otp/store";
        const dataBadhan = JSON.stringify({ phone_number: num });

        const headersBadhan = {
            "User-Agent": "Dart/3.1 (dart:io)",
            "access-control-allow-credentials": "true",
            "access-control-allow-headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
            "Accept": "application/json",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "POST, OPTIONS",
            "Accept-Encoding": "gzip",
            "app-access-token": "mWR+64IbKwxM2XCyJbMvUSCcc=",
            "Content-Type": "application/json; charset=utf-8"
        };

        const badhanResponse = await fetch(urlBadhan, {
            method: "POST",
            headers: headersBadhan,
            body: dataBadhan
        });

        const badhanResult = await badhanResponse.json();

        // Return combined response
        res.status(200).json({
            lazzPharmaResponse: lazzPharmaResult,
            shwapnoResponse: shwapnoResult,
            badhanResponse: badhanResult
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
