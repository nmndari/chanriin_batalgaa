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
`testIdAttribute: 'data-test'` (SauceDemo нь `data-testid` биш `data-test` хэрэглэдэг).