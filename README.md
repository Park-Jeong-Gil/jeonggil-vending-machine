# 자판기 시뮬레이터 (Vending Machine Simulator)

ProtoPie - Frontend 사전 과제, 현금과 카드 결제가 가능한 자판기 웹 시뮬레이터 입니다.

<img src="preview-image.png" alt="자판기 시뮬레이터 미리보기" width="400"/>

## 주요 내용

- 픽셀 디자인으로 컨셉 구축
- 현금/카드 결제 구현
- 자판기, 지갑에서 실시간 잔액 표시
- 음료의 재고 상태 관리
- 거스름 돈 반환 구현
- 음료 배출 애니메이션

## 기술 스택

- Vite 5
- React 18
- TypeScript 5
- Recoil 
- SCSS 

## 시작하기

### 실행 조건

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/Park-Jeong-Gil/jeonggil-vending-machine.git

# 프로젝트 디렉토리로 이동
cd jeonggil-vending-machine

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/         # 리액트 컴포넌트
├── recoil/            # Recoil 상태 관리
├── types/             # TypeScript 타입 정의
├── db/                # 더미 데이터 (JSON)
├── style/             # SCSS 스타일
└── assets/            # 이미지 등 정적 파일
```
