/**
 * DClay 출강이력 데이터
 * ------------------------------------------------------------
 * 출처: (주)디클레이 강사 프로필(강사섭외 자료) "강의 이력 -1/-2/-3" 표
 * 이 파일만 수정하면 출강이력 페이지(institutions.html)에 자동 반영됩니다.
 *
 * 항목 구조:
 *   title    : 과정명
 *   period   : 교육년도 (예: "2026.06", "2025.09~11")
 *   hours    : 교육시간 (예: "8h", "20h", "1Y6M")
 *   org      : 교육기관
 *   upcoming : 예정 과정이면 true (프로필 자료에 "(예정)"으로 표시된 항목)
 *   link     : 보도자료/관련 기사 URL. 아직 없으면 null로 두세요.
 *              (나중에 URL이 생기면 이 값만 채우면 목록에 자동으로 링크가 생깁니다)
 *
 * 새 강의가 생기면 배열 맨 위에 항목을 추가하면 됩니다.
 *
 * ※ 2026-09-12: 구글시트("DClay 출강이력")의 보도자료링크 값을 이 파일에 병합했습니다.
 *    (구글시트에는 기간/시간/기관 칼럼이 없어 사이트가 시트를 읽지 못하고
 *    계속 이 파일로만 동작하고 있었습니다 — 상세 내용은 대화 참고)
 */

const LECTURES = [
  { title: "소상공인AI 상생협업 교육", period: "2026.11~12", hours: "20h", org: "한국생산성본부_서울", upcoming: true, link: null },
  { title: "사회복지사 대상 클로드 사용법", period: "2026.10", hours: "4h", org: "한국노인종합복지관협회", upcoming: true, link: null },
  { title: "빅데이터를 통한 기상청 데이터 활용", period: "2026.09", hours: "8h", org: "기상기후인재개발원", upcoming: true, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=392205" },
  { title: "디지털자산 제작", period: "2026.09", hours: "8h", org: "한국생산성본부_전주", upcoming: true, link: null },
  { title: "소상공인AI 상생협업 교육", period: "2026.08~09", hours: "20h", org: "한국생산성본부_수원", upcoming: false, link: null },
  { title: "AI활용_정확한 프롬프트 사용방법", period: "2026.08", hours: "4h", org: "(주)타이거일렉", upcoming: false, link: "https://www.didimkorea.net/news/539923" },
  { title: "데이터 분석", period: "2026.07", hours: "8h", org: "한국생산성본부_서울", upcoming: false, link: null },
  { title: "홍보 콘텐트 제작", period: "2026.07", hours: "8h", org: "한국생산성본부_광주", upcoming: false, link: null },
  { title: "AI 스마트폰 활용", period: "2026.07~08", hours: "16h", org: "성북구 평생학습관", upcoming: false, link: "https://www.didimkorea.net/news/526749" },
  { title: "AI 스마트폰 활용", period: "2026.07", hours: "8h", org: "남현동 주민센터", upcoming: false, link: null },
  { title: "다문화가족을 위한 AI 에듀테크 활용", period: "2026.06~07", hours: "12h", org: "함평천지종합복지관", upcoming: false, link: "https://www.didimkorea.net/news/514722" },
  { title: "AI 디지털배움터 - 디지털 안내사 면접관", period: "2026.06", hours: "24h", org: "창동 아우르네", upcoming: false, link: "https://blog.naver.com/dclay_edu/224326452760" },
  { title: "AI윤리 + 리터러시 자격 강사 양성 과정", period: "2026.06", hours: "12h", org: "미래디지털AI협회", upcoming: false, link: "https://www.didimkorea.net/news/514713" },
  { title: "현업 임직원대상 AI활용 데이터 분석", period: "2026.06", hours: "9h", org: "용인시 산업진흥원", upcoming: false, link: "https://www.didimkorea.net/news/509863" },
  { title: "AI진화의 흐름과 우리 삶의 변화 (특강)", period: "2026.06", hours: "2h", org: "서초구립 느티나무쉼터", upcoming: false, link: "https://www.didimkorea.net/news/511753" },
  { title: "리더의 MZ세대 소통", period: "2026.06", hours: "2h", org: "근로복지공단 인재개발원", upcoming: false, link: "https://cafe.naver.com/mydigitalai/241" },
  { title: "클로드 AI 에이전트 사용법", period: "2026.06", hours: "4h", org: "서울복지재단", upcoming: false, link: "https://www.didimkorea.net/news/514717" },
  { title: "예비창업자 대상 AI활용 사업계획서 작성하기", period: "2026.05", hours: "9h", org: "용인시 산업진흥원", upcoming: false, link: "https://www.didimkorea.net/news/506039" },
  { title: "AI활용 + AI윤리 + AI리터러시", period: "2026.05~12", hours: "520h", org: "용답구립도서관", upcoming: false, link: null },
  { title: "AI윤리 + 리터러시 자격 강사 양성 과정", period: "2026.04", hours: "12h", org: "미래디지털AI협회", upcoming: false, link: null },
  { title: "데이터분석/자동화 (Opal)", period: "2026.04", hours: "2h", org: "미래디지털AI협회", upcoming: false, link: null },
  { title: "AI디지털리터러시 자격 과정: 강사양성", period: "2026.04~05", hours: "12h", org: "경기도교육청 평생학습관", upcoming: false, link: "https://www.didimkorea.net/news/489733" },
  { title: "AI를 활용한 업무 자동화", period: "2026.04", hours: "6h", org: "아산 농업기술센터", upcoming: false, link: "https://www.didimkorea.net/news/484721" },
  { title: "강사 자격증 과정: Google All in one", period: "2026.03", hours: "3h", org: "미래디지털AI협회", upcoming: false, link: "https://www.esgtimes.kr/news/469963" },
  { title: "강사 자격증 과정: 바이브코딩(Vibe Coding)", period: "2026.03", hours: "3h", org: "미래디지털AI협회", upcoming: false, link: "https://www.esgtimes.kr/news/470538" },
  { title: "강사대상 온라인 브랜딩 \"네이버 인물등록\"", period: "2026.02", hours: "2h", org: "미래디지털AI협회", upcoming: false, link: "https://www.esgtimes.kr/news/469963" },
  { title: "PBL기반 AI활용 업무 혁신", period: "2026.02~10", hours: "40h", org: "부산시 공무원 인재개발원", upcoming: false, link: null },
  { title: "NH농협손해보험 지점장 대상 AI활용 효율화", period: "2025.12", hours: "5h", org: "NH 농협손해보험", upcoming: false, link: null },
  { title: "강사 대상 \"AI 영상 만들기\"", period: "2025.11", hours: "3h", org: "미래디지털AI협회", upcoming: false, link: "http://knpp.co.kr/news/445325" },
  { title: "AI 및 디지털 기술 적극 활용하기", period: "2025.11", hours: "4h", org: "식약처", upcoming: false, link: "http://knpp.co.kr/news/442489" },
  { title: "AI 활용한 '글'쓰기", period: "2025.10", hours: "3h", org: "미래디지털AI협회", upcoming: false, link: "https://www.hdh365.co.kr/news/435103" },
  { title: "AI 올바른 마케팅", period: "2025.10", hours: "4h", org: "프라임에셋 본사", upcoming: false, link: null },
  { title: "AI영상 제작 올인원 특강", period: "2025.10", hours: "6h", org: "한국강사교육진흥원", upcoming: false, link: "https://www.lecturernews.com/news/articleView.html?idxno=188585" },
  { title: "시니어 AI활용", period: "2025.10~11", hours: "24h", org: "부천 한울빛도서관", upcoming: false, link: "https://www.esgtimes.kr/news/445327" },
  { title: "LLM사용, 데이터분석, AI윤리, 보고서 작성", period: "2025.09~11", hours: "84h", org: "부천시 공무원", upcoming: false, link: "https://www.esgtimes.kr/news/444932" },
  { title: "강사들의 업무 효율화", period: "2025.09", hours: "2h", org: "미래디지털AI협회", upcoming: false, link: "https://www.didimkorea.net/news/489287" },
  { title: "기업 임직원 AI데이터 활용", period: "2025.09", hours: "7h", org: "안산 상공회의소", upcoming: false, link: "https://www.sbma.kr/news_gisa/gisa_view.htm?gisa_category=01000000&gisa_idx=71686&date_y=&date_m=" },
  { title: "생성형AI로 단숨에 해결하는 업무혁신", period: "2025.09", hours: "12h", org: "광주광역시 교통공사", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=363375" },
  { title: "강사교육: 전문성 있는 교안 만들기", period: "2025.09", hours: "2h", org: "미래디지털AI협회", upcoming: false, link: null },
  { title: "빅데이터 생활에 이용하기", period: "2025.09", hours: "4h", org: "안산 초지종합사회복지관", upcoming: false, link: null },
  { title: "시니어를 위한 AI (스마트폰) 활용", period: "2025.09", hours: "16h", org: "광명종합복지관", upcoming: false, link: null },
  { title: "경찰업무를 위한 AI 시그널: 치안정보를 지키고, 현장을 바꾸는 AI 전략", period: "2025.09", hours: "3h", org: "부산 경찰청", upcoming: false, link: null },
  { title: "AI 트렌드", period: "2025.08", hours: "2h", org: "디딤돌", upcoming: false, link: null },
  { title: "생성형AI 활용을 통한 기업 임직원 업무효율화 끝장내기", period: "2025.08", hours: "5h", org: "대구대학교", upcoming: false, link: null },
  { title: "내 손안의 AI 비서, 생활속 챗GPT 활용", period: "2025.08", hours: "4h", org: "양천지역자활센터", upcoming: false, link: null },
  { title: "디지털배움터 - 디지털 안내사 면접관", period: "2025.08", hours: "16h", org: "창동 아우르네", upcoming: false, link: null },
  { title: "사례관리, 이제 100배 빠르게! 스마트한 프롬프트 활용법", period: "2025.07", hours: "4h", org: "부천시 상동종합사회복지관", upcoming: false, link: "https://www.esgtimes.kr/news/445327" },
  { title: "생성형AI 활용을 통한 기업 임직원 업무효율화 끝장내기", period: "2025.07", hours: "6h", org: "(주)신영", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=357737" },
  { title: "생성형AI로 단숨에 해결하는 업무혁신", period: "2025.07", hours: "4h", org: "광주광역시 시청", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=363375" },
  { title: "AI윤리", period: "2025.07", hours: "2h", org: "뉴미디어교육연구소", upcoming: false, link: null },
  { title: "시니어를 위한 AI (스마트폰) 활용", period: "2025.06~11", hours: "150h", org: "광명시립 하안노인종합복지관", upcoming: false, link: null },
  { title: "생성형AI로 단숨에 해결하는 업무혁신", period: "2025.06", hours: "4h", org: "광주광역시 시청", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=355595" },
  { title: "시니어를 위한 AI윤리 생활", period: "2025.06", hours: "2h", org: "한국디지털튜터협회", upcoming: false, link: null },
  { title: "Stibee, Maily 등을 활용한 사회서비스 기관 뉴스레터 제작하기", period: "2025.06", hours: "4h", org: "부천시 상동종합사회복지관", upcoming: false, link: null },
  { title: "AI 가상인간 & Clipchamp를 활용한 사회서비스 홍보 콘텐츠 제작", period: "2025.06", hours: "4h", org: "부천시 상동종합사회복지관", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=355594" },
  { title: "ChatGPT&AI를 활용한 프로그램기획서 작성", period: "2025.06", hours: "4h", org: "부천시 상동종합사회복지관", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=354189" },
  { title: "CEO대상 생성형AI 활용 업무혁신과 리더의 역할", period: "2025.06", hours: "2h", org: "안산 상공회의소", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=364724" },
  { title: "AI를 활용한 교수전략 및 매체제작 -2", period: "2025.06", hours: "4h", org: "거창 평생교육원", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=352928" },
  { title: "AI를 활용한 교수전략 및 매체제작 -1", period: "2025.05", hours: "4h", org: "거창 평생교육원", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=352928" },
  { title: "생성형 AI 활용 강사 양성", period: "2025.05", hours: "6h", org: "평택시청", upcoming: false, link: null },
  { title: "나만의 챗봇 만들기", period: "2025.05", hours: "3h", org: "뉴미디어교육연구소", upcoming: false, link: null },
  { title: "4차 산업혁명과 생성형AI 시대의 여성 리더십", period: "2025.04", hours: "2h", org: "연수구청 여성대학", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=350304" },
  { title: "챗GPT, 데이터분석, AI윤리, 보고서 작성", period: "2025.04", hours: "16h", org: "부천시 공무원", upcoming: false, link: "https://m.fntoday.co.kr/news/articleView.html?idxno=369576" },
  { title: "행사 시나리오 커뮤니케이션 + PPT제작 + 보도자료 작성", period: "2025.03", hours: "7h", org: "강원도 태백소방학교", upcoming: false, link: null },
  { title: "챗GPT, 데이터분석, AI윤리, 보고서 작성", period: "2025.03", hours: "8h", org: "부천시 공무원", upcoming: false, link: "https://www.fntoday.co.kr/news/articleView.html?idxno=365069" },
  { title: "AI시대 \"잘 노는 아이\"가 세상을 바꾼다", period: "2025.03", hours: "2h", org: "경기도 공무원 인재개발원", upcoming: false, link: null },
  { title: "챗GPT, 데이터분석, 보고서 작성, AI와 대화하는 법", period: "2025.02~11", hours: "40h", org: "부산시 공무원 인재개발원", upcoming: false, link: "https://www.esgtimes.kr/news/435623" },
  { title: "강사로서 올바른 AI윤리", period: "2025.01", hours: "6h", org: "미래디지털AI협회", upcoming: false, link: null },
  { title: "AI시대의 윤리적인 생활 (AI윤리)", period: "2024.12", hours: "4h", org: "역곡중학교", upcoming: false, link: null },
  { title: "AI시대의 윤리적인 생활 (AI윤리) + AI와 창의적인 대화법", period: "2024.12", hours: "8h", org: "석천중학교", upcoming: false, link: null },
  { title: "상상을 뛰어넘는 AI경쟁력에 대한 경고", period: "2024.11", hours: "4h", org: "심원중학교", upcoming: false, link: null },
  { title: "올바른 생성형AI 활용법", period: "2024.11", hours: "4h", org: "부명중학교", upcoming: false, link: null },
  { title: "AI활용한 마케팅 + 커뮤니케이션", period: "2024.11", hours: "4h", org: "충북 콘텐츠코리아랩", upcoming: false, link: "https://www.cbckl.kr/www/selectBbsNttView.do;jsessionid=01F941D6707C2204923AF62C9A00B222?key=62&bbsNo=6&nttNo=1546&searchCtgry=&searchCnd=all&searchKrwd=&pageIndex=1&integrDeptCode=" },
  { title: "챗GPT 업그레이드버전 + 냅킨 활용법", period: "2024.11", hours: "2h", org: "(주)한국강사교육진흥원", upcoming: false, link: "https://www.lecturernews.com/news/articleView.html?idxno=174869" },
  { title: "역사를 뒤흔든 과학, AI가 바꾸는 세상", period: "2024.10", hours: "3h", org: "경기도 공무원 인재개발원", upcoming: false, link: null },
  { title: "챗GPT, AI활용 선택과 보고서 작성", period: "2024.10", hours: "3h", org: "경기도 공무원 인재개발원", upcoming: false, link: null },
  { title: "온라인 항해게임을 통한 성과관리 리더십", period: "2024.09", hours: "4h", org: "현대백화점 인재개발원", upcoming: false, link: null },
  { title: "공문서&보고서(AI활용마케팅) 작성", period: "2024.06", hours: "3h", org: "게임물위원회", upcoming: false, link: null },
  { title: "챗GPT를 활용한 공문서(AI활용마케팅) 작성", period: "2024.06", hours: "4h", org: "항만공사", upcoming: false, link: null },
  { title: "퍼실리테이터로서의 커뮤니케이션 기법", period: "2024.05~08", hours: "4개월", org: "의정부 평생학습원", upcoming: false, link: null },
  { title: "직업훈련 사무행정 실무자 양성과정", period: "2024.05", hours: "12h", org: "영월 여성회관", upcoming: false, link: null },
  { title: "공문서 작성법 강사양성과정", period: "2024.05", hours: "6h", org: "양주시청", upcoming: false, link: null },
  { title: "역사를 뒤흔든 과학, AI가 바꾸는 세상", period: "2024.05", hours: "2h", org: "한국강사교육진흥원", upcoming: false, link: null },
  { title: "가천대 명강사최고위 과정", period: "2023~2025", hours: "1년 6개월", org: "가천대학교 / 한국강사교육진흥원", upcoming: false, link: null },
  { title: "성남시 \"나도 강사다\" 강사양성과정", period: "2024~2025", hours: "4개월", org: "가천대학교 / 한국강사교육진흥원", upcoming: false, link: null },
  { title: "비정형문서데이터 검색 분석", period: "2021~2025", hours: "4년", org: "LG CNS", upcoming: false, link: null },
  { title: "빅데이터 활용 기반 구축을 위한 비정형DB 활용", period: "2019~2021", hours: "2년", org: "한국의류시험원", upcoming: false, link: null },
  { title: "원시데이터 관리시스템 관리", period: "2019~2020", hours: "6개월", org: "소프트온넷(주)", upcoming: false, link: null },
  { title: "시험실자동화시스템 기반 데이터 활용", period: "2013~2019", hours: "6년", org: "한국산업기술시험원", upcoming: false, link: null },
  { title: "비정형문서데이터 검색 분석", period: "2013~2019", hours: "6년", org: "한국산업기술시험원", upcoming: false, link: null },
  { title: "국가가축방역통합시스템 축산차량GPS등록제", period: "2011~2012", hours: "2년", org: "농림축산식품부", upcoming: false, link: null },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = LECTURES;
}
