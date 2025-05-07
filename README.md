הפרויקט הזה נעשה על ידי מירון סבג בשביל מטלת בית מ
BMC
בשפת אנגולר גרסה 19.2.10 אם זה מעניין מישהו
המבנה הפורמלי של הריד-מי לא כזה מעניין לדעתי אז אני כותב פה מה שחשוב

# מבנה

האפליקציה בנויה מ4 קומפוננטות עיקריות
signup - משמשת להרשמה של שם משתמש וסיסמא לפי הדרישות
login משמשת לכניסה לדף של האפליקציה חמשתמשים רשומים
הזיכרון מאוחסן מקומית כי זה פרויקט קטן, עוד לא הספקתי להוסיף שרת שיזכור הכל

LAYOUT - היא קומפוננטה שמחולקת ל2 קומפוננטות: עגלה ומוצרים.
היא מוגנת על ידי
auth.guard
שמאפשר כניסה רק אחרי שהזנת שם משתמש וסיסמא רשומים.
בחרתי לא להוציא את מי שסוגר את הדפדפן אלא להשאיר אותו מחובר עד שהוא עושה
LOGOUT

PRODUCT - הדף של המוצרים מכיל רשימה של 3 מוצרים
ומציג אותם (שם, מחיר ותמונה גנרית שהורדתי מהאינטרנט ושמרתי בתיקייה ASSETS/IMAGES)
ניתן להוסיף כל פריט לעגלה והעגלה תישמר בצורה אוטומטית. העדפתי לא לשים התראה בכל הוספה של פריט

CART - בדף של העגלה רואים את רשימת הפריטים לפי הסדר של ההוספה שלהם
ניתן למחוק פריט ספציפי או לרוקן את העגלה לגמרי.
בשני הדפים ניתן לצאת באמצעות לוגאאוט בחלק העליון של הדף
ולראות את שם המשתמש:החלק שלפני ה@ במייל

# טסטים

כתבתי 3 טסטים בתיקייה
tests
תחת השם
e2e.tests
ניתן להריץ אותן על ידי הרצת הפרויקט בטרמינל אחד
(עם ng serve כרגיל)
ובטרמינל נוסף להריץ את הפקודה:
npx playwright test
ניתן להוסיף דגל --ui
כדי לראות ויזואליזציה של הטסטים
בדיקה 1 רושמת שם משתמש, נכנסת לחשבון, מוסיפה פריט לעגלה ובודקת שהוא התווסף
בדיקה שנייה נרשמת לחשבון ואז מנסה להיכנס עם סיסמא שונה ומצפה להיכשל
בדיקה שלישית מוסיפה כמה פריטים לעגלה ובודקת שהסכום המחושב בעגלה נכון

# lazy loading

כדי לממש את הפונקציות העצלניות בחרתי בצורת
STANDALONE לכל הקומפוננטות שכתבתי
היתרונות הם שלא כל האפליקציה נטענת כשנכנסים לשרת אלא רק הדפים הדרושים.
ניתן לראות שזה באמת קורה כשמריצים את האפליקציה עוברים ללשונית של מפתחים
F12 - NETWORK - TS
ואז רואים כשלוחצים למשל על הדף של העגלה או של המוצרים שפתאום נטענים דפים חדשים.

# ShoppingCart

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the "playwright" test runner, use the following command:

```bash
npx playwright test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
