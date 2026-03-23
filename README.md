# 아들을 위한 퀴즈 앱 (Quiz For Son)

정우를 위해 만든 퀴즈 모험 웹앱입니다.
물고기, 동물, 공룡, 곤충, 새 카테고리의 문제를 풀며 재미있게 학습할 수 있습니다.

## 주요 기능

- 카테고리별 퀴즈 플레이
- 문제 읽어주기(TTS)
- 날짜별 로컬 기록 저장
- 어린이 친화형 출제 우선순위
  쉬운 문제를 먼저 고르고, 사진이 없으면 힌트 카드로 보여줍니다.

## 사용 기술

- React Native / Expo
- AsyncStorage
- Expo Speech
- React Navigation

## 설치 및 실행

```bash
git clone https://github.com/SeungMin-Park-psm1757/Quiz_for_son.git
cd Quiz_for_son
npm install
npx expo start
```

웹으로 확인하려면:

```bash
npx expo start --web
```

정적 웹 빌드를 만들려면:

```bash
npm run build:web
```

## 현재 구조 메모

- 로그인 기능은 제거했습니다.
- Firebase 연동은 제거했습니다.
- 기록은 서버가 아니라 각 브라우저의 로컬 저장소에만 보관됩니다.
- GitHub Pages 배포용 워크플로우는 `.github/workflows/deploy-pages.yml`에 있습니다.
- `web-build/` 폴더는 웹 배포 산출물입니다.

## 개발자 정보

- 제작: 정우 아빠 (SeungMin Park)
- 개발 환경: Windows / PowerShell / VS Code
