export const universities = [
  { id: "bdu", name: "Bakı Dövlət Universiteti", short: "BDU" },
  { id: "ada", name: "ADA Universiteti", short: "ADA" },
  { id: "unec", name: "UNEC", short: "UNEC" },
  { id: "aztu", name: "Azərbaycan Texniki Universiteti", short: "AzTU" },
  { id: "bmu", name: "Bakı Mühəndislik Universiteti", short: "BMU" },
  { id: "khazar", name: "Xəzər Universiteti", short: "Xəzər" },
  { id: "adnsu", name: "Neft və Sənaye Universiteti", short: "ADNSU" },
] as const;

export type UniId = (typeof universities)[number]["id"];
export const uniName = (id: UniId) => universities.find((u) => u.id === id)?.short ?? id;

export const districts = ["Yasamal", "Nəsimi", "Nərimanov", "Səbail", "Xətai", "Binəqədi"] as const;
export const amenityList = ["Wi-Fi", "Kondisioner", "Paltaryuyan", "Mebel", "Kombi", "Lift", "Balkon", "Parkinq"] as const;

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=75`;
const IMG = [
  "photo-1502672260266-1c1ef2d93688", "photo-1522708323590-d24dbb6b0267", "photo-1560448204-e02f11c3d0e2",
  "photo-1493809842364-78817add7ffb", "photo-1505691938895-1758d7feb511", "photo-1484154218962-a197022b5858",
  "photo-1554995207-c18c203602cb", "photo-1586023492125-27b2c045efd7", "photo-1600210492486-724fe5c67fb0",
  "photo-1598928506311-c55ded91a20c", "photo-1536376072261-38c75010e6c9", "photo-1512918728675-ed5a9ecdebfd",
].map(u);
const pick = (i: number) => [0, 1, 2, 3].map((k) => IMG[(i + k * 3) % IMG.length]!);

export type Tenant = { name: string; uni: UniId; course: string; prefs: string[] };
export type Home = {
  id: string; title: string; district: (typeof districts)[number]; address: string;
  price: number; deposit: number; rooms: number; area: number; floor: string;
  unis: { id: UniId; minutes: number }[]; spots: number; available: string;
  amenities: string[]; images: string[]; description: string; rating: number; reviews: number;
  landlord: { name: string; since: number; response: string };
  tenants: Tenant[]; compat?: number; featured?: boolean;
};

export const homes: Home[] = [
  { id: "yasamal-sunny-2", title: "İşıqlı 2 otaqlı mənzil, Elmlər metrosu yaxınlığında", district: "Yasamal", address: "Hüseyn Cavid pr. 31", price: 650, deposit: 650, rooms: 2, area: 68, floor: "7/16", unis: [{ id: "bdu", minutes: 8 }, { id: "aztu", minutes: 12 }], spots: 1, available: "1 Dekabr", amenities: ["Wi-Fi", "Kondisioner", "Paltaryuyan", "Mebel", "Kombi", "Lift"], images: pick(0), description: "Təzə təmirli, tam əşyalı mənzil. Elmlər Akademiyası metrosuna 4 dəqiqəlik piyada məsafədədir. Bir otaq hazırda BDU tələbəsi tərəfindən istifadə olunur, ikinci otaq yeni otaq yoldaşı üçün boşdur.", rating: 4.9, reviews: 23, landlord: { name: "Rəna Məmmədova", since: 2021, response: "1 saat ərzində" }, tenants: [{ name: "Aysel Q.", uni: "bdu", course: "3-cü kurs, Hüquq", prefs: ["Saat 23:00-dan sonra sakitlik", "Siqaret çəkilmir", "Ev heyvanı yoxdur", "Həftəlik təmizlik növbəsi"] }], compat: 92, featured: true },
  { id: "ada-studio-narimanov", title: "ADA-ya yaxın müasir studio", district: "Nərimanov", address: "Əhməd Rəcəbli küç. 4", price: 520, deposit: 520, rooms: 1, area: 42, floor: "5/12", unis: [{ id: "ada", minutes: 6 }, { id: "unec", minutes: 15 }], spots: 0, available: "İndi", amenities: ["Wi-Fi", "Kondisioner", "Mebel", "Lift", "Balkon"], images: pick(1), description: "Fərdi yaşamaq istəyən tələbələr üçün ideal studio. Böyük pəncərələr, iş masası və sürətli internet.", rating: 4.8, reviews: 17, landlord: { name: "Elçin Həsənov", since: 2020, response: "3 saat ərzində" }, tenants: [], featured: true },
  { id: "nasimi-shared-3", title: "3 otaqlı paylaşımlı mənzil, 28 May", district: "Nəsimi", address: "Bülbül pr. 18", price: 330, deposit: 330, rooms: 3, area: 95, floor: "4/9", unis: [{ id: "unec", minutes: 7 }, { id: "adnsu", minutes: 10 }], spots: 2, available: "15 Dekabr", amenities: ["Wi-Fi", "Paltaryuyan", "Mebel", "Kombi"], images: pick(2), description: "Şəhərin mərkəzində, 28 May metrosuna yaxın. Qiymət bir otaq üçündür. Mətbəx və qonaq otağı ortaqdır.", rating: 4.6, reviews: 31, landlord: { name: "Tural Əliyev", since: 2019, response: "2 saat ərzində" }, tenants: [{ name: "Murad S.", uni: "unec", course: "2-ci kurs, Maliyyə", prefs: ["Siqaret yalnız balkonda", "Qonaqlar həftəsonu", "Mətbəx hər gün təmizlənir"] }], compat: 78, featured: true },
  { id: "sabail-seaview", title: "Bulvara baxan 2 otaqlı mənzil", district: "Səbail", address: "Neftçilər pr. 77", price: 900, deposit: 900, rooms: 2, area: 74, floor: "9/14", unis: [{ id: "adnsu", minutes: 9 }, { id: "bdu", minutes: 20 }], spots: 1, available: "1 Yanvar", amenities: ["Wi-Fi", "Kondisioner", "Paltaryuyan", "Mebel", "Lift", "Balkon", "Parkinq"], images: pick(3), description: "Dəniz mənzərəli premium mənzil. Təhlükəsiz bina, 24/7 mühafizə.", rating: 4.9, reviews: 12, landlord: { name: "Leyla Quliyeva", since: 2022, response: "30 dəqiqə ərzində" }, tenants: [{ name: "Nərmin H.", uni: "adnsu", course: "4-cü kurs, Mühəndislik", prefs: ["Erkən yatır (22:30)", "Siqaret çəkilmir", "Yalnız qız otaq yoldaşı"] }], compat: 85, featured: true },
  { id: "khatai-budget-room", title: "Sərfəli otaq, Xətai metrosu", district: "Xətai", address: "Xətai pr. 12", price: 280, deposit: 280, rooms: 2, area: 55, floor: "3/9", unis: [{ id: "aztu", minutes: 14 }, { id: "bmu", minutes: 25 }], spots: 1, available: "İndi", amenities: ["Wi-Fi", "Mebel", "Kombi"], images: pick(4), description: "Büdcəsini qoruyan tələbələr üçün rahat otaq. Metro 3 dəqiqəlik məsafədədir.", rating: 4.4, reviews: 19, landlord: { name: "Vüqar Rzayev", since: 2018, response: "5 saat ərzində" }, tenants: [{ name: "Kənan M.", uni: "aztu", course: "1-ci kurs, İT", prefs: ["Gecə gec yatır", "Musiqi qulaqcıqla", "Siqaret çəkilmir"] }], compat: 71 },
  { id: "binagadi-family-3", title: "Geniş 3 otaqlı mənzil, Memar Əcəmi", district: "Binəqədi", address: "Cəlil Məmmədquluzadə küç. 90", price: 750, deposit: 750, rooms: 3, area: 102, floor: "11/17", unis: [{ id: "bmu", minutes: 18 }, { id: "khazar", minutes: 22 }], spots: 3, available: "1 Dekabr", amenities: ["Wi-Fi", "Kondisioner", "Paltaryuyan", "Mebel", "Kombi", "Lift", "Parkinq"], images: pick(5), description: "3 tələbə üçün ideal. Hər otaqda iş masası və şkaf var.", rating: 4.7, reviews: 9, landlord: { name: "Səbinə Abdullayeva", since: 2023, response: "1 saat ərzində" }, tenants: [] },
  { id: "khazar-loft", title: "Xəzər Universitetinə yaxın loft", district: "Nərimanov", address: "Məhsəti küç. 41", price: 600, deposit: 600, rooms: 2, area: 60, floor: "6/10", unis: [{ id: "khazar", minutes: 5 }, { id: "ada", minutes: 14 }], spots: 1, available: "20 Dekabr", amenities: ["Wi-Fi", "Kondisioner", "Mebel", "Balkon"], images: pick(6), description: "Yüksək tavanlı, dizayn mebelli loft üslublu mənzil.", rating: 4.8, reviews: 14, landlord: { name: "Orxan Kərimov", since: 2021, response: "2 saat ərzində" }, tenants: [{ name: "Ləman T.", uni: "khazar", course: "3-cü kurs, Dizayn", prefs: ["Bitkilərə qulluq ortaq", "Qonaqlar xəbərdarlıqla", "Ev heyvanı (pişik) var"] }], compat: 88 },
  { id: "yasamal-cozy-1", title: "Rahat 1 otaqlı mənzil, İnşaatçılar", district: "Yasamal", address: "Şərifzadə küç. 210", price: 450, deposit: 450, rooms: 1, area: 38, floor: "2/5", unis: [{ id: "bdu", minutes: 10 }, { id: "unec", minutes: 18 }], spots: 0, available: "İndi", amenities: ["Wi-Fi", "Paltaryuyan", "Mebel", "Kombi"], images: pick(7), description: "Sakit həyətdə, kiçik amma çox rahat mənzil.", rating: 4.5, reviews: 21, landlord: { name: "Rəna Məmmədova", since: 2021, response: "1 saat ərzində" }, tenants: [] },
];

export const getHome = (id: string) => homes.find((h) => h.id === id);

export const reviews = [
  { name: "Fərid N.", uni: "BDU", rating: 5, text: "Ev sahibi çox qayğıkeşdir, problemlər bir gündə həll olunur. Metro yaxındır." },
  { name: "Günay A.", uni: "ADA", rating: 5, text: "Şəkillərdəki kimi təmiz və işıqlıdır. Otaq yoldaşı ilə EvDash vasitəsilə tanış olduq." },
  { name: "Rauf İ.", uni: "UNEC", rating: 4, text: "Qiymət keyfiyyətə uyğundur. Yalnız qışda bir az soyuq olur." },
];

export type Roommate = {
  id: string; name: string; age: number; uni: UniId; course: string; budget: [number, number];
  sleep: string; clean: number; habits: string[]; bio: string; compat: number; why: string[]; district: string; hue: number;
};

export const roommates: Roommate[] = [
  { id: "aysel", name: "Aysel Qasımova", age: 20, uni: "bdu", course: "Hüquq, 3-cü kurs", budget: [300, 400], sleep: "Erkən quş · 23:00", clean: 5, habits: ["Siqaret çəkmir", "Kitab oxuyur", "Yoqa"], bio: "Sakit, nizamlı və səmimi. Həftəsonları ailəmin yanına gedirəm.", compat: 94, why: ["Eyni yuxu rejimi", "Büdcə uyğundur", "İkiniz də siqaret çəkmirsiniz"], district: "Yasamal", hue: 30 },
  { id: "murad", name: "Murad Səfərli", age: 21, uni: "unec", course: "Maliyyə, 2-ci kurs", budget: [250, 350], sleep: "Balanslı · 00:00", clean: 4, habits: ["Futbol", "Yemək bişirir", "Qonaqsevər"], bio: "Yemək bişirməyi sevirəm, mətbəxi təmiz saxlayıram.", compat: 86, why: ["Universitetlər yaxındır", "Oxşar təmizlik səviyyəsi"], district: "Nəsimi", hue: 200 },
  { id: "narmin", name: "Nərmin Hüseynova", age: 22, uni: "adnsu", course: "Mühəndislik, 4-cü kurs", budget: [400, 550], sleep: "Erkən quş · 22:30", clean: 5, habits: ["Siqaret çəkmir", "İdman", "Sakit mühit"], bio: "Diplom işi yazıram, sakit və təmiz mühit axtarıram.", compat: 81, why: ["Hər ikiniz sakitliyə önəm verirsiniz", "Təmizlik 5/5"], district: "Səbail", hue: 340 },
  { id: "kanan", name: "Kənan Məmmədov", age: 18, uni: "aztu", course: "İT, 1-ci kurs", budget: [200, 300], sleep: "Gecə bayquşu · 02:00", clean: 3, habits: ["Oyunlar", "Proqramlaşdırma", "Qulaqcıqla musiqi"], bio: "Gəncədən gəlmişəm, şəhərdə yeniyəm. Dostcanlıyam.", compat: 64, why: ["Büdcə uyğundur", "Yuxu rejimi fərqlidir"], district: "Xətai", hue: 150 },
  { id: "laman", name: "Ləman Tağıyeva", age: 21, uni: "khazar", course: "Dizayn, 3-cü kurs", budget: [300, 450], sleep: "Balanslı · 00:30", clean: 4, habits: ["Pişiyi var", "Rəsm çəkir", "Bitkilər"], bio: "Yaradıcı, açıq fikirli. Pişiyim Bəbiş də mənimlə yaşayır.", compat: 77, why: ["Oxşar maraqlar", "Büdcə uyğundur"], district: "Nərimanov", hue: 60 },
  { id: "elvin", name: "Elvin Novruzov", age: 23, uni: "ada", course: "Magistr, Beynəlxalq münasibətlər", budget: [450, 600], sleep: "Erkən quş · 23:30", clean: 5, habits: ["Siqaret çəkmir", "Qaçış", "Dil öyrənir"], bio: "Səhər 6-da qaçışa çıxıram. Nizam-intizam vacibdir.", compat: 89, why: ["Eyni yuxu rejimi", "Təmizlik 5/5", "Siqaret çəkmirsiniz"], district: "Nərimanov", hue: 260 },
];
