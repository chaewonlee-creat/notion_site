
# **📊 포트폴리오 | 고객관리 헬스 스코어(CRM Health Score) 구축 사례**


---


### **프로젝트 개요**

- **프로젝트명:** **「고객상태(Hot·Warm·Cold·Lost) 기반 CRM 헬스스코어 구축」**
- **기간/역할:** 2025.05 (1주) · Sales Analyst
- **사용 기술:** Excel (Dynamic Arrays: LET, FILTER, UNIQUE), Google Sheets, FingerSales CRM

---


## **🚩 문제정의 (Pain Points)**

- 고객 상태 관리가 직관적이지 않고 체계가 없어 영업 리소스 낭비
- 각 고객 상태(Hot/Warm/Cold/Lost)의 관리 기준 부재 → 영업 우선순위 불명확
- 계약 성사율 및 고객 응대 효율 저하

---


## **✅ 문제해결 솔루션**

- CRM 데이터를 기반으로 고객의 관심도·진행 상태를 **“Hot·Warm·Cold·Lost”** 4단계로 분류
- 각 상태별로 가중치를 부여해 **“헬스스코어”** 를 산출하고 고객의 우선순위를 명확히 시각화
- **Hot→Warm→Cold→Lost** 순서로 우선순위를 부여하고, 고객 응대 및 팔로업 자동화

| **상태**   | **정의**           | **가중치(예시)** |
| -------- | ---------------- | ----------- |
| 🔥 Hot   | 적극적 관심, 계약임박     | 100점        |
| 🌤️ Warm | 관심 있음, 추가 팔로업 필요 | 70점         |
| 🌥️ Cold | 반응 미온적, 관리 필요    | 30점         |
| ❄️ Lost  | 무응답 또는 부정적 반응    | 0점          |


---


## **📈 성과 및 KPI**

- **영업 효율성:** Hot/Warm 고객 우선적 대응으로 업무효율 향상 (콜 대비 계약전환율 4.4% 달성)
- **자동화 구현:** Excel 기반 자동화로 일일 고객 관리 분석시간 80% 감소 (30분→6분)
- **계약성사율 향상:** 핵심 고객(Hot/Warm)에 집중 대응하여 계약 전환율 증가 (초기 1.0% → 4.4%로 향상)

| **Before (Before 헬스스코어)** | **After (After 헬스스코어)** |
| ------------------------- | ----------------------- |
| 불명확한 상태로 고객 관리            | 헬스스코어로 고객 우선순위 명확       |
| 대응시간 및 리소스 낭비 발생          | 업무시간 80% 단축, 계약전환율 4.4% |


---


## **⚙️ 활용 기술 스택 (Skills)**

- **Excel Dynamic Functions:** (LET, FILTER, UNIQUE)
- **Google Sheets 연동:** 실시간 팀 협업 환경 구축
- **FingerSales CRM:** 고객 데이터 수집 및 상태 관리 자동화
- **데이터 분석 기법:** 고객 데이터 상태별 가중치 설정 및 점수화 시스템 구축

---


## **🎯 포트폴리오 핵심요약 Bullet (한글·영문)**

> KR:
> “CRM 데이터를 활용하여 고객 상태(Hot·Warm·Cold·Lost) 기반의 헬스스코어를 구축,
> 영업 효율을 높이고 계약전환율을 1.0% → 4.4%로 향상시킴. (Excel, FingerSales CRM)”
> EN:
> “Built a CRM health-score system based on customer statuses (Hot·Warm·Cold·Lost),
> improving sales efficiency and increasing conversion rates from 1.0% to 4.4%
> (Using Excel Dynamic Functions & FingerSales CRM).”

---


## **📌 포트폴리오 패키징 추천 (1-page PDF or Notion 페이지)**

- **표지 (Cover):** 제목 + 기간 + 역할
- **문제정의 & 솔루션 (Pain & Solution):** 직관적 다이어그램
- **헬스스코어 시스템 (CRM Health-Score):** 상태별 점수화 및 우선순위 시각화 그래픽
- **성과 지표 (KPI & Result):** 계약전환율 향상 등 실질적 숫자 포함
- **기술 스택:** Excel 로고, Google Sheets, FingerSales 등 기술 이미지
- **향후 발전 가능성:** AI 기반 자동 고객 알림·팔로업 로드맵
