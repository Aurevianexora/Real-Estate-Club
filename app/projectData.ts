export type ClubProject = {
  slug: string;
  title: string;
  client: string;
  location: string;
  year: string;
  type: string;
  image: string;
  involvement: string;
};

export const clubProjects: ClubProject[] = [
  {
    slug: "dar-al-saad",
    title: "حفل إطلاق مشروع دار السعد",
    client: "منازل الشعلة العقارية",
    location: "المنطقة الشرقية",
    year: "2025",
    type: "حفل إطلاق مشروع",
    image: "/project/project-featured.jpg",
    involvement: "نظّم النادي العقاري حفل الإطلاق الرسمي وأدار فقرات الحدث بحضور المطوّر وشركائه ونخبة مهتمة بالقطاع.",
  },
  {
    slug: "seredo-dammam",
    title: "معرض سيريدو — الدمام",
    client: "سيريدو إكسبو",
    location: "الدمام",
    year: "2026",
    type: "معرض ومؤتمر عقاري",
    image: "/project/project-seredo.jpg",
    involvement: "وثّق النادي مشاركته في تنظيم وتهيئة حضور معرض سيريدو العقاري في الدمام ضمن أعماله العقارية.",
  },
  {
    slug: "dar-altilal-dhahran",
    title: "مشروع دار التلال — الظهران",
    client: "دار الإعمار",
    location: "الظهران",
    year: "2025",
    type: "حفل افتتاح مشروع سكني",
    image: "/project/project-dar-altilal.jpg",
    involvement: "تولّى النادي العقاري تنظيم حفل افتتاح مشروع دار التلال وإدارة فقرات الحدث ودعوات حضور الحفل.",
  },
  {
    slug: "sukoon-khobar",
    title: "سكون كمباوند — الخبر",
    client: "سكون العقارية",
    location: "الخبر",
    year: "2026",
    type: "حفل افتتاح مشروع سكني",
    image: "/project/project-sukoon.jpg",
    involvement: "نظّم النادي العقاري فعالية افتتاح سكون كمباوند وأشرف على التجهيزات وفقرات الحفل والتوثيق.",
  },
  {
    slug: "business-hub-dammam",
    title: "مركز أعمال بزنس هب — الدمام",
    client: "بزنس هب من فهدان",
    location: "الدمام",
    year: "2026",
    type: "حفل افتتاح مركز أعمال",
    image: "/project/project-prince-hub.jpg",
    involvement: "تولّى النادي العقاري تنظيم حفل افتتاح مركز الأعمال وتوجيه الدعوات وإدارة فقرات الافتتاح والضيافة.",
  },
];

export function getClubProject(slug: string) {
  return clubProjects.find((project) => project.slug === slug);
}
