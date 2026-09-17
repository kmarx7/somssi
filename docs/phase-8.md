# PHASE 8 — Certificate & Public Verification

체험 완료 시 `SOMSSI-GY/KN/MH-YYYYMMDD-XXXX` 형식의 인증서를 발급합니다. 공개 검증 경로는 `/certificate/[certificateId]`이며 이름, 체험, 날짜, Creator, 인증번호와 VERIFIED 상태만 노출합니다. 이메일·전화번호·결제정보는 공개하지 않습니다.

현재 인증서는 개발용 메모리 저장소이며 QR 표현도 개발용 시각화입니다. 운영 전에는 Supabase certificates 테이블, 서명 가능한 검증 토큰, 실제 QR 생성, 관리자 인증을 연결해야 합니다.
