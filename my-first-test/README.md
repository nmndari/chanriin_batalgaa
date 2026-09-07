# Playwright дадлага — SauceDemo нэвтрэх тест

**Нэр:** Намуундарь
**Оюутны код:** B232270037

**Төслийн зам:** төсөл нь repo-ийн `my-first-test/` дэд хавтсанд байна. Ажиллуулахын тулд:
```bash
git clone https://github.com/nmndari/chanriin_batalgaa.git
cd chanriin_batalgaa/my-first-test
npm install
npx playwright install
npx playwright test
```


## Юу хийсэн

Playwright-ээр [SauceDemo](https://www.saucedemo.com) демо дэлгүүр дээр end-to-end
тест бичив: 
- `npm init playwright@latest` коммандаар төсөл үүсгэж,
[`tests/mytest.spec.ts`](tests/mytest.spec.ts)-д 4 тест бичсэн. Үүнд: 
- амжилттай нэвтрэх,
- буруу нууц үгээр нэвтрэх (сөрөг тест), 
- нэвтэрсний дараа сагсанд бараа нэмэх,
- системээс гарах. 

Шалгалтад `toHaveURL`, `toBeVisible`, `toHaveText`, `toContainText`, `toHaveCount`, 
`toBeHidden`, `not.toHaveURL` ашиглаж, элемент олоход зөвхөн `getByRole`, `getByText`, `getByTestId`, `getByPlaceholder` хэрэглэсэн. 

XPath нь DOM-ийн бүтцэд баригддаг, уншихад хэцүү, хэрэглэгчийн туршлагыг шалгадаггүй тул хэрэглээгүй. Тохируулгад хоёр зүйл гараар нэмэх шаардлагатай болсон: `getByTestId` ажиллахын тулд
`testIdAttribute: 'data-test'` (SauceDemo нь `data-testid` биш `data-test` хэрэглэдэг), бичлэг авахын тулд `video: 'on'` — `--video` гэсэн CLI флаг байдаггүй учраас config-оос тохируулна. 

Санаатайгаар унадаг 4 тест ([`tests/failed-demo.spec.ts`](tests/failed-demo.spec.ts),
config-ийн `testIgnore`-оор ердийн ажиллагаанаас хасагдсан) бичиж trace viewer-ээр
мөшгихөд `element(s) not found` гэсэн **яг ижил** мессеж нь "локатор буруу"
([`docs/fail-locator-not-found-trace.zip`](docs/fail-locator-not-found-trace.zip))
ба "элемент үнэхээр байхгүй"
([`docs/fail-element-missing-trace.zip`](docs/fail-element-missing-trace.zip)) гэсэн
хоёр өөр шалтгааныг зааглаж чаддаггүй, зөвхөн trace дээрх DOM snapshot нь хэлж
өгдөг ([`docs/login-pass-trace.zip`](docs/login-pass-trace.zip) нь амжилттай
ажиллагааны trace). 

Үр дүн: 4 тест × 3 хөтөч = **12 passed**, унасан тест байхгүй; HTML тайлан, 12
видео, 3 trace-ыг [`docs/`](docs/) фолдерт хадгалсан, учир нь Playwright-ийн
`playwright-report/` ба `test-results/` хоёр `.gitignore`-д байдаг тул git тэднийг
хадгалахгүй.

```bash
cd my-first-test
npx playwright test                  # 12 тест, 3 хөтөч
npx playwright test --ui             # интерактив
npx playwright show-report           # HTML тайлан
npx playwright show-report docs/report   # хадгалсан тайлан
npx playwright show-trace docs/fail-locator-not-found-trace.zip
```

## Playwright ба Selenium-ийн ялгаа — өөрийн ажиглалт

Хамгийн том ялгаа нь тохируулга: нэг `npm init playwright@latest` команд гурван
хөтчийн бинарыг татсан бол Selenium дээр WebDriver тус бүрийг хувилбартай
тааруулах шаардлагатай. Мөн `sleep`/`wait` хэрэглээгүй — Playwright өөрөө
хүлээж, дахин шалгадаг. Selenium дээр `WebDriverWait`-гүйгээр тест flaky буюу тогтворгүй,
хааяа унадаг байна. Strict mode нь "Add to cart" товч 6 байхад алдаа өгсөн, харин Selenium-ийн
`findElement` чимээгүйхэн эхнийхийг авдаг. Trace viewer нь тест унасан мөчийн
DOM-ыг хадгалдаг, Selenium дээр stack trace болон нэг screenshot-оор
хязгаарлагддаг. Selenium нь W3C стандарт, олон хэл дэмждэг тул том багуудад
давуу талтай, шинэ төсөлд Playwright-ийг сонгоно.