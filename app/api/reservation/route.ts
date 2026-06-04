import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TO_EMAIL = 'alaocakbasiantalya@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, party, message } = body;

    if (!name || !email || !phone || !date || !time || !party) {
      return NextResponse.json({ error: 'Eksik alan' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #081A0C; color: #F0ECD8; padding: 40px; border: 1px solid #C9A227;">
        <h1 style="color: #C9A227; font-size: 28px; margin-bottom: 8px; font-style: italic;">ÂLÂ Ocakbaşı</h1>
        <p style="color: #C9A227; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 32px;">Yeni Rezervasyon Talebi</p>
        <hr style="border: none; border-top: 1px solid #C9A22740; margin-bottom: 32px;" />

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #C9A227; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; width: 140px;">Ad Soyad</td>
            <td style="padding: 10px 0; color: #F0ECD8; font-size: 15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #C9A227; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">E-posta</td>
            <td style="padding: 10px 0; color: #F0ECD8; font-size: 15px;"><a href="mailto:${email}" style="color: #F0ECD8;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #C9A227; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Telefon</td>
            <td style="padding: 10px 0; color: #F0ECD8; font-size: 15px;"><a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #F0ECD8;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #C9A227; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Tarih</td>
            <td style="padding: 10px 0; color: #F0ECD8; font-size: 15px;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #C9A227; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Saat</td>
            <td style="padding: 10px 0; color: #F0ECD8; font-size: 15px;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #C9A227; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Kişi Sayısı</td>
            <td style="padding: 10px 0; color: #F0ECD8; font-size: 15px;">${party}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 10px 0; color: #C9A227; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; vertical-align: top;">Notlar</td>
            <td style="padding: 10px 0; color: #F0ECD8; font-size: 15px;">${message}</td>
          </tr>` : ''}
        </table>

        <hr style="border: none; border-top: 1px solid #C9A22740; margin-top: 32px;" />
        <p style="color: #C9A22780; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-top: 24px;">
          ÂLÂ Ocakbaşı · Şirinyalı, 1539. Sk. No:4, Muratpaşa/Antalya
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"ÂLÂ Ocakbaşı" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Rezervasyon: ${name} · ${date} ${time} · ${party}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Rezervasyon e-postası gönderilemedi:', err);
    return NextResponse.json({ error: 'E-posta gönderilemedi' }, { status: 500 });
  }
}
