import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, subject, message } = req.body;

        await resend.emails.send({
            from: "DE Computers <onboarding@resend.dev>",
            to: "decomputers2008@gmail.com",
            subject: subject || "📦 Porosi e re - DE Computers",
            text: message || ""
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Email nuk u dërgua"
        });
    }
}
