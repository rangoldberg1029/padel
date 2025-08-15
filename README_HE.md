# Padel Buddy – אפליקציית פאדל שיתופית (PWA + Firebase)

האפליקציה הזאת מאפשרת לכל החמישה:
- לעשות הגרלה ל־4/5 שחקנים (כולל מי בחוץ)
- להזין משחקים (עד 15 נקודות / סט 6 גיימים)
- לראות סטטיסטיקות לזוגות + זוג השבוע
- להתקין לאפליקציה במסך הבית (PWA)
- לעבוד **שיתופי** בזמן אמת (Firebase Firestore)

## שלבים מהירים (10–15 ד׳)

1) **צור פרויקט Firebase** (חינם): https://console.firebase.google.com → Add project  
2) בלשונית **Build → Firestore Database**: יצירה במצב *Production*.  
3) **Web App**: Project settings → General → Your apps → (סמל </>) Add app. קבלו את `firebaseConfig` (האובייקט עם apiKey וכו׳).  
4) פתחו את `index.html` וחפשו `PASTE_ME` – הדביקו שם את כל ה־firebaseConfig שלכם.  
5) **כללי אבטחה בסיסיים (Firestore Security Rules)** – ב-Firestore → Rules, לשימוש סגור לחמישה:  
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // לפיילוט. בהמשך נצמצם ע"פ אימיילים
    }
  }
}
```
> להקשחה מאוחרת: נפתח Authentication (Sign in with Google) ונחמיר את הכללים לפי משתמשים מורשים בלבד.

6) **פריסה (Deploy) בחינם**:
   - Netlify: גרור את התיקייה `padel-buddy-pwa` לדשבורד ב-Netlify או חברו ריפו GitHub.  
   - Vercel / GitHub Pages: אותו רעיון – הפרויקט סטטי.  
   - חשוב: האתר חייב לרוץ ב-HTTPS כדי שה-PWA וה-SW יעבדו.

7) **שיתוף והתקנה**:
   - שלחו את הקישור לחברים.
   - כל אחד פותח את הכתובת בטלפון → תפריט הדפדפן → "הוסף למסך הבית".

## שימוש
- בלשונית "שחקנים": ערכו שמות ולחצו "שמור שמות לשיתוף" – זה שומר ל-Firestore לכולם.
- "הגרלה": סמנו נוכחות והגרילו זוגות. פתחו Session חדש בכל מפגש.
- "הזנת משחק": בחרו Session, הזינו שמות/ניקוד ושמרו.
- "סטטיסטיקות" ו"זוג השבוע": מתעדכן אוטומטית מהדאטה.

## מבנה הנתונים (Firestore)
- `players` – מסמכים `{ name: string, idx: number }`
- `sessions` – מסמכים `{ date: YYYY-MM-DD, label: string }`
- `matches` – מסמכים `{ date, week, sessionId, round, format, A1, A2, B1, B2, scoreA, scoreB, winner }`

## טיפים
- רוצים ליידע את כולם למלא תוצאה? הוסיפו בקלות Cloud Function/Webhook בחריגות הבסיס.
- אפשר לייצר גרף מתקדם/דפי דוחות נוספים – הכל בקובץ index.html.
- לוגו/אייקון: החליפו את `icon-192.png` ו-`icon-512.png` בגרסה שלכם.

בהצלחה! ⚡
