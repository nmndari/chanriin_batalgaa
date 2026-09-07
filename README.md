# Чанарын батлагаа — Playwright лаб

**Нэр:** Намуундарь
**Оюутны код:** B232270037

## Төсөл хаана байна

Төсөл нь [`my-first-test/`](my-first-test/) хавтсанд байна.
**[my-first-test/README.md](my-first-test/README.md)** — хийсэн ажлын бүрэн тайлбар,
Playwright ба Selenium-ийн харьцуулалт.

## Ажиллуулах

```bash
git clone https://github.com/nmndari/chanriin_batalgaa.git
cd chanriin_batalgaa/my-first-test
npm install
npx playwright install
npx playwright test
```

Хүлээгдэх үр дүн: **12 passed** (4 тест × 3 хөтөч — Chromium, Firefox, WebKit).

## Файлын бүтэц

| Зам | Юу |
|---|---|
| [`my-first-test/tests/mytest.spec.ts`](my-first-test/tests/mytest.spec.ts) | 4 үндсэн тест |
| [`my-first-test/tests/failed-demo.spec.ts`](my-first-test/tests/failed-demo.spec.ts) | Санаатай унадаг 4 тест (`testIgnore`-оор ердийн ажиллагаанаас хасагдсан) |
| [`my-first-test/playwright.config.ts`](my-first-test/playwright.config.ts) | 3 хөтөч, `testIdAttribute`, `video`, `testIgnore` |
| [`my-first-test/docs/report/`](my-first-test/docs/report/) | HTML тайлан (12 passed) |
| [`my-first-test/docs/video/`](my-first-test/docs/video/) | 12 видео бичлэг |
| [`my-first-test/docs/*.zip`](my-first-test/docs/) | 3 trace — амжилттай ба унасан хоёр төрлийн алдаа |
