import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.json()

  await resend.emails.send({
    from: "Marketing Room <onboarding@resend.dev>",
    to: "dvstudiomarketing@gmail.com",
    subject: "Új Marketing Reality Room jelentkező",
    text: `
Név: ${data.name}
Email: ${data.email}
Vállalkozás: ${data.business}
Weboldal: ${data.website}
    `,
  })

  return NextResponse.json({ success: true })
}
