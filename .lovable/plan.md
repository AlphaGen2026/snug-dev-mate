# MediAI premium demo

## Maqsad
MediAI’ni 5 soniyada tushunarli qiladigan, investor va shifokorlarga ko‘rsatishga tayyor interaktiv frontend demo yaratish. Demo real tashxis bermaydi va barcha tibbiy natijalarni “AI-assisted” hamda professional ko‘rik talab qiladigan ma’lumot sifatida ko‘rsatadi.

## Quriladigan tajriba
- `/` sahifasida premium tibbiy-AI landing: navigatsiya, kuchli kirish qismi, ishonch signallari, mahsulot imkoniyatlari va ishlaydigan “Demoni ko‘rish” chaqiruvi.
- Bir sahifali interaktiv dashboard maketi: umumiy ko‘rsatkichlar, AI Radiologist, Medical Advisor, Doctors va Appointments bo‘limlari.
- AI Radiologist demo oqimi: scan turini tanlash, fayl yuklash, tahlil jarayoni va ehtiyotkor tilda namunaviy natija.
- Mobil qurilmalarda pastki navigatsiya, ixcham boshqaruv va qulay yuklash oqimi.
- Demo ichida UZ / RU / EN til almashtirish va light / dark ko‘rinish.

## Dizayn yo‘nalishi
- Klinik oq fon, chuqur midnight, cyan/teal aksent va faqat AI belgilarida nazoratli violet.
- Qattiq tipografik ierarxiya, 8px gacha radiuslar, juda kam gradient va glow.
- Original “medical command center” ko‘rinishi; oddiy dashboard shabloni yoki cyberpunk uslub emas.
- Barcha ranglar va holatlar yagona semantik dizayn tokenlaridan olinadi.

## Texnik yondashuv
- TanStack Start’ning mavjud `/` sahifasi almashtiriladi; alohida backend ulanmaydi.
- Demo ma’lumotlari ochiq “sample/demo” sifatida belgilanadi; foydalanuvchi ma’lumoti saqlanmaydi.
- Kichik qayta ishlatiladigan UI qismlari va Lucide ikonkalari ishlatiladi.
- Harakatlar reduced-motion sozlamasini hurmat qiladi; klaviatura fokuslari va semantik teglar qo‘llanadi.
- Sahifa uchun noyob title, description va ijtimoiy metadata yoziladi.

## Tekshiruv
- Desktop va mobil o‘lchamlarda vizual tekshiruv.
- Navigatsiya, til, tema, scan turi, yuklash va tahlil holatlari sinovi.
- Konsol xatolari va matn chiqib ketishlari tekshiriladi.
