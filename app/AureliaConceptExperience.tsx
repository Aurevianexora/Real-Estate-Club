"use client";

import dynamic from "next/dynamic";

const ConceptScene = dynamic(() => import("./ConceptScene"), { ssr: false });

export default function AureliaConceptExperience() {
  return (
    <section className="projects-concept" aria-labelledby="concept-title">
      <div className="projects-concept-copy">
        <p className="club-section-label">معمل التجربة المعمارية</p>
        <h1 id="concept-title">نموذج استكشاف ثلاثي الأبعاد</h1>
        <p>
          مشهد مجرّد تم الحفاظ عليه كمرجع تصميمي ومكون قابل لإعادة الاستخدام. لا يمثل مبنى أو مشروعاً عقارياً حقيقياً، ولا يتضمن بيانات وحدات أو أسعار أو مخططات.
        </p>
      </div>
      <div className="projects-concept-canvas"><ConceptScene /></div>
    </section>
  );
}
