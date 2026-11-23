import type { Metadata } from "next";
import AureliaConceptExperience from "../AureliaConceptExperience";

export const metadata: Metadata = {
  title: "مشاريع النادي العقاري",
  description: "مساحة مخصصة لمشروعات النادي العقاري؛ المواد المعمارية الموثقة تظهر عند توفرها.",
};

export default function ProjectsPage() {
  return (
    <main className="club-root" dir="rtl">
      <AureliaConceptExperience />
    </main>
  );
}
