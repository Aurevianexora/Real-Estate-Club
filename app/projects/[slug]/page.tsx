import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clubProjects, getClubProject } from "../../projectData";

export function generateStaticParams() {
  return clubProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getClubProject(slug);
  return {
    title: project ? `${project.title} — النادي العقاري` : "مشروع غير موجود — النادي العقاري",
    description: project?.involvement ?? "تفاصيل مشروع موثقة لدى النادي العقاري.",
  };
}

export const instant = false;

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getClubProject(slug);

  if (!project) {
    return (
      <main className="club-root club-project-detail" dir="rtl">
        <section className="club-project-detail-empty">
          <p className="club-section-label">مشروع غير متاح</p>
          <h1>لم يتم العثور على هذا المشروع</h1>
          <Link className="club-project-back" href="/#work"><ArrowRight size={18} /> العودة إلى المشاريع</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="club-root club-project-detail" dir="rtl">
      <header className="club-detail-header">
        <Link className="club-detail-brand" href="/" aria-label="العودة إلى الصفحة الرئيسية">
          <Image src="/brand/realclub-wordmark.png" alt="النادي العقاري" width={362} height={104} priority />
        </Link>
        <Link className="club-project-back" href="/#work"><ArrowRight size={18} /> العودة إلى المشاريع</Link>
      </header>

      <section className="club-detail-hero" aria-labelledby="project-title">
        <Image src={project.image} alt={project.title} fill priority sizes="100vw" />
        <div className="club-detail-hero-scrim" />
        <div className="club-container club-detail-hero-content">
          <p className="club-section-label">{project.type}</p>
          <h1 id="project-title">{project.title}</h1>
        </div>
      </section>

      <section className="club-detail-body">
        <div className="club-container club-detail-grid">
          <div>
            <p className="club-section-label">دور النادي العقاري</p>
            <h2>نطاق عمل موثق</h2>
            <p className="club-detail-involvement">{project.involvement}</p>
          </div>
          <dl className="club-detail-facts">
            <div><dt>الجهة المرتبط بها المشروع</dt><dd>{project.client}</dd></div>
            <div><dt>الموقع</dt><dd>{project.location}</dd></div>
            <div><dt>السنة</dt><dd>{project.year}</dd></div>
            <div><dt>نوع الفعالية</dt><dd>{project.type}</dd></div>
          </dl>
        </div>
        <div className="club-container club-detail-gallery">
          <Image src={project.image} alt={project.title} width={1500} height={1000} />
        </div>
      </section>
    </main>
  );
}
