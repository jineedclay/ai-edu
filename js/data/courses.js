// DClay 교육과정 상세 데이터 ("자세히 보기" 모달에 사용)
// 참고: 교육 시간·난이도, 학습 흐름 4단계, 안내 문구는 대표님 검토 후 확정된 내용입니다.
const COURSES = {
  "generative-ai": {
    index: "01 / 08",
    tag: "GENERATIVE AI",
    title: "생성형 AI 실무교육",
    description: "ChatGPT·Gemini·Claude 등 생성형 AI를 실제 업무에 적용합니다.",
    audience: "보고·기획·콘텐츠 업무에 AI를 적용하려는 실무자",
    structure: "업무 과제 선정 → 생성형 AI 활용 흐름 → 결과 검토 기준",
    output: "직무별 프롬프트 템플릿과 업무 문서 초안",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "업무 과제 선정", desc: "실제 업무 중 AI를 적용할 과제를 함께 정합니다." },
      { title: "프롬프트 설계", desc: "원하는 결과를 얻는 질문법을 익힙니다." },
      { title: "실습·결과 검토", desc: "업무 문서를 직접 작성하고 결과를 검토하는 기준을 세웁니다." },
      { title: "현업 적용 정리", desc: "재사용할 수 있는 직무별 프롬프트로 정리합니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<path d="M11 13h26v19H23l-8 6v-6h-4V13Z"/><path d="M18 20h12M18 25h8"/>'
  },
  "data-analytics": {
    index: "02 / 08",
    tag: "DATA ANALYTICS",
    title: "데이터 분석·활용",
    description: "데이터 정리부터 분석·시각화·의사결정까지 연결합니다.",
    audience: "데이터로 현황을 파악하고 의사결정 자료를 만드는 실무자",
    structure: "분석 질문 설정 → AI와 함께 분석하는 흐름 → 결과 해석",
    output: "데이터 분석 결과와 시각화 요약 자료",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "데이터 점검", desc: "분석에 필요한 데이터 상태를 함께 확인합니다." },
      { title: "분석 질문 설정", desc: "업무 목적에 맞는 분석 기준을 정합니다." },
      { title: "AI 분석·시각화", desc: "패턴을 찾아 차트로 표현합니다." },
      { title: "결과 해석 정리", desc: "분석 근거를 바탕으로 활용 방안을 정리합니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<path d="M10 37h28M14 33V22h6v11M22 33V13h6v20M30 33V18h6v15"/>'
  },
  "automation": {
    index: "03 / 08",
    tag: "AUTOMATION",
    title: "AI 업무자동화",
    description: "반복 업무와 업무 프로세스를 AI로 개선합니다.",
    audience: "AI를 활용해 반복 업무와 기존 업무 프로세스를 개선하려는 조직·실무자",
    structure: "업무 프로세스 분석 → AI 적용 업무 발굴 → 자동화 설계 → AI 도구·에이전트 활용",
    output: "우리 조직의 AX 업무개선 프로토타입 또는 업무자동화 시안",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "업무 프로세스 분석", desc: "반복 업무와 병목 지점을 함께 짚어봅니다." },
      { title: "AI 적용 업무 발굴", desc: "자동화가 가능한 업무를 선별합니다." },
      { title: "자동화 설계·실습", desc: "AI 도구와 에이전트로 흐름을 직접 구성합니다." },
      { title: "프로토타입 점검", desc: "결과물을 검토하고 현업 적용 방안을 정리합니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<path d="M17 12h14l3 5 6 1v12l-6 1-3 5H17l-3-5-6-1V18l6-1 3-5Z"/><circle cx="24" cy="24" r="6"/>'
  },
  "literacy": {
    index: "04 / 08",
    tag: "AI LITERACY",
    title: "디지털·AI 리터러시",
    description: "AI를 올바르게 이해하고 안전하게 활용합니다.",
    audience: "AI를 안전하고 책임 있게 활용해야 하는 학습자·구성원",
    structure: "AI의 한계 이해 → 정보 검증 → 개인정보·저작권 → 활용 원칙",
    output: "AI 활용 점검표와 안전한 활용 가이드",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "AI의 이해", desc: "생성형 AI의 작동 방식과 한계를 사례로 살펴봅니다." },
      { title: "정보 검증", desc: "사실과 의견, 신뢰할 수 있는 출처를 구분합니다." },
      { title: "책임 있는 활용", desc: "개인정보·저작권을 고려하는 습관을 익힙니다." },
      { title: "활용 원칙 정리", desc: "우리 상황에 맞는 안전한 활용 가이드를 만듭니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<circle cx="24" cy="24" r="15"/><path d="M9 24h30M24 9c5 5 7 10 7 15s-2 10-7 15c-5-5-7-10-7-15s2-10 7-15Z"/>'
  },
  "vibe-coding": {
    index: "05 / 08",
    tag: "VIBE CODING",
    title: "바이브코딩 실무",
    description: "대화형 AI 도구로 아이디어를 앱·웹페이지 결과물로 빠르게 구현합니다.",
    audience: "아이디어를 직접 웹페이지·업무용 도구로 만들어보고 싶은 실무자·학습자",
    structure: "대화형 AI 코딩 도구 활용 → 요구사항을 프롬프트로 구조화 → 결과물 점검·보완",
    output: "직접 완성한 웹페이지 또는 간단한 업무용 도구 시제품",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "문제와 사용자 정의", desc: "무엇을, 누가 사용할 도구인지 정합니다." },
      { title: "요구사항 구조화", desc: "기능을 프롬프트로 구체화합니다." },
      { title: "제작·수정", desc: "AI와 함께 만들고 피드백을 반영합니다." },
      { title: "결과물 점검", desc: "동작과 완성도를 확인하고 다듬습니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<path d="M18 15 9 24l9 9M30 15l9 9-9 9M27 12l-6 24"/>'
  },
  "ax-workshop": {
    index: "06 / 08",
    tag: "AX WORKSHOP",
    title: "AX 전략·실행 워크숍",
    description: "AI 전환의 출발점을 찾고, 현업의 문제를 실행 가능한 개선 과제로 바꾸는 교육입니다.",
    audience: "공공기관·기업의 관리자·실무 리더",
    structure: "업무 진단 → 과제 선정 → 실행 설계 → 성과 점검",
    output: "업무 진단표와 AX 실행 계획",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "업무 진단", desc: "반복 업무와 병목을 정리하고 AI 적용 가능성을 살펴봅니다." },
      { title: "과제 선정", desc: "효과와 실행 난이도를 기준으로 우선 과제를 고릅니다." },
      { title: "실행 설계", desc: "담당자·데이터·검토 기준·일정을 구체화합니다." },
      { title: "성과 점검", desc: "교육 전후 비교와 후속 실행 계획을 정리합니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<circle cx="24" cy="24" r="15"/><circle cx="24" cy="24" r="7"/><circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none"/>'
  },
  "sme-marketing": {
    index: "07 / 08",
    tag: "SME MARKETING",
    title: "소상공인 AI 마케팅",
    description: "Google Ads와 AI 도구로 우리 가게에 맞는 광고와 홍보물을 직접 만듭니다.",
    audience: "온라인 광고를 직접 운영해보고 싶은 소상공인",
    structure: "광고 목표 설정 → 검색광고 등록 실습 → AI로 홍보물 제작 → 성과 확인",
    output: "실제 등록한 검색광고와 AI로 만든 홍보물(전단지·포스터 등)",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "광고 목표 정하기", desc: "우리 가게에 맞는 광고 목적과 예산을 정합니다." },
      { title: "검색광고 등록", desc: "키워드와 광고문구를 직접 만들어 등록합니다." },
      { title: "AI 홍보물 제작", desc: "AI로 전단지·포스터·쿠폰 등을 만듭니다." },
      { title: "성과 확인", desc: "광고 결과를 함께 확인하고 다음 단계를 정리합니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<path d="M8 19h6l14-9v28l-14-9H8V19Z"/><path d="M30 17a9 9 0 0 1 0 14"/>'
  },
  "business-plan": {
    index: "08 / 08",
    tag: "BUSINESS PLAN",
    title: "AI 사업계획서 작성",
    description: "AI를 활용해 정부지원사업 사업계획서를 체계적으로 작성합니다.",
    audience: "정부지원사업을 준비하는 예비창업자·소상공인",
    structure: "사업 아이디어 정리 → AI로 초안 작성 → 항목별 구조화 → 검토·보완",
    output: "직접 작성한 사업계획서 초안",
    duration: "기관 목표와 대상에 따라 맞춤 협의",
    steps: [
      { title: "사업 아이디어 정리", desc: "내 사업의 핵심을 한 줄로 정리합니다." },
      { title: "AI 초안 작성", desc: "AI와 함께 사업계획서 초안을 만듭니다." },
      { title: "항목별 구조화", desc: "지원사업 양식에 맞게 다듬습니다." },
      { title: "검토·보완", desc: "내용을 검토하고 설득력 있게 보완합니다." }
    ],
    note: "제안 교육 구성입니다. 실제 커리큘럼과 진행 방식은 기관 목표와 대상에 따라 협의합니다.",
    iconPaths: '<path d="M14 8h14l6 6v26H14V8Z"/><path d="M28 8v6h6"/><path d="M18 24h12M18 30h12M18 18h6"/>'
  }
};
