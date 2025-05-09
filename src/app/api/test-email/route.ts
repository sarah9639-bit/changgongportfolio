import { NextResponse } from 'next/server';

export async function GET() {
  // 환경변수 확인 (비밀번호는 보안을 위해 길이만 반환)
  const emailConfig = {
    user: process.env.EMAIL_USER,
    passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0,
    admin: process.env.ADMIN_EMAIL,
  };

  return NextResponse.json({
    message: '이메일 설정이 로드되었습니다.',
    config: emailConfig,
  });
} 