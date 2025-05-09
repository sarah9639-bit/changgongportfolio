import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, email, message, agreement } = await req.json();

    // 이메일 전송을 위한 transporter 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 이메일 옵션 설정
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // 관리자 이메일 주소
      subject: `[웹사이트 문의] ${name}님의 문의가 도착했습니다`,
      html: `
        <h3>새로운 문의가 도착했습니다</h3>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>문의내용:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>개인정보 수집 동의:</strong> ${agreement ? '동의함' : '동의하지 않음'}</p>
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: '문의가 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '문의 전송에 실패했습니다.' },
      { status: 500 }
    );
  }
} 