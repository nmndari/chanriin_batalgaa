# Playwright дадлага — SauceDemo нэвтрэх тест

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
`testIdAttribute: 'data-test'` (SauceDemo нь `data-testid` биш `data-test` хэрэглэдэг), бичлэг авахын тулд `video: 'on'` — `--video` гэсэн CLI флаг байгаагүй учраас config-оос тохируулна. 

Санаатай унадаг тестүүд бичиж туршихад "локатор буруу" ба "элемент үнэхээр байхгүй" гэсэн
**яг ижил** `element(s) not found` мессежтэй хоёр алдааг зөвхөн trace дээрх DOM
snapshot-оор зааглаж болохыг харсан. 

Үр дүн: 4 тест × 3 хөтөч = **12 passed**,
унасан тест байхгүй; HTML тайлан ба 12 видеог [`evidence/`](evidence/) фолдерт
хадгалсан, учир нь Playwright-ийн `playwright-report/` ба `test-results/` хоёр
`.gitignore`-д байдаг тул git тэднийг хадгалахгүй.

```bash
cd my-first-test
npx playwright test                  # 12 тест, 3 хөтөч
npx playwright test --ui             # интерактив режим
npx playwright show-report           # HTML тайлан
open evidence/report/index.html      # хадгалсан тайлан
```

## Playwright ба Selenium-ийн ялгаа — өөрийн ажиглалт

Хамгийн том ялгаа нь тохируулга: нэг `npm init playwright@latest` команд гурван
хөтчийн бинарыг татсан бол Selenium дээр WebDriver тус бүрийг хувилбартай
тааруулах шаардлагатай. Мөн `sleep`/`wait` нэг ч мөр бичээгүй — Playwright өөрөө
хүлээж, дахин шалгадаг, Selenium дээр `WebDriverWait`-гүйгээр тест flaky болдог.
Strict mode нь "Add to cart" товч 6 байхад алдаа өгсөн, харин Selenium-ийн
`findElement` чимээгүйхэн эхнийхийг авдаг. Trace viewer нь тест унасан мөчийн
DOM-ыг хадгалдаг, Selenium дээр stack trace болон нэг screenshot-оор
хязгаарлагддаг. Selenium нь W3C стандарт, олон хэл дэмждэг тул том багуудад
давуу — шинэ төсөлд Playwright-ийг сонгоно.