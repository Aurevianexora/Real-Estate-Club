"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import ClubLogoIntro from "./ClubLogoIntro";
import { clubProjects } from "./projectData";

const services = [
	{
		title: "تجهيز احترافي",
		text: "تخطيط وتجهيز موقع الفعالية بأحدث التقنيات السمعية والبصرية المتوافقة مع هوية المشروع.",
	},
	{
		title: "توثيق وإعلام",
		text: "تصوير عقاري احترافي، وإدارة الحملات الإعلامية والتغطيات عبر المؤثرين.",
	},
	{
		title: "علاقات عامة",
		text: "إعداد وتوجيه الدعوات لجمهور مستهدف يضم مستثمرين ومرخصين في القطاع العقاري.",
	},
	{
		title: "ضيافة وإشراف",
		text: "ضيافة راقية وإدارة فقرات الحفل بعناية حتى يخرج الحدث بأبهى صورة.",
	},
	{
		title: "صناعة الفرص والشراكات",
		text: "ربط المطورين والمستثمرين وصنّاع القرار وتحويل الفعالية إلى منصة لبناء العلاقات.",
	},
];

export default function RealClubExperience() {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) return;

		const lenis = new Lenis({ smoothWheel: true, duration: 1.05 });
		let raf = 0;
		const tick = (time: number) => {
			lenis.raf(time);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		gsap.registerPlugin(ScrollTrigger);
		document.documentElement.classList.add("club-reveal-ready");

		gsap.utils.toArray<HTMLElement>("[data-club-reveal]").forEach((element) => {
			gsap.fromTo(element, { opacity: 0, y: 18 }, {
				opacity: 1,
				y: 0,
				duration: 0.72,
				ease: "power2.out",
				scrollTrigger: { trigger: element, start: "top 88%", once: true },
			});
		});

		gsap.to(".club-hero-media", {
			yPercent: 12,
			ease: "none",
			scrollTrigger: { trigger: ".club-hero", start: "top top", end: "bottom top", scrub: true },
		});

		return () => {
			cancelAnimationFrame(raf);
			lenis.destroy();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			gsap.killTweensOf(".club-hero-media");
			document.documentElement.classList.remove("club-reveal-ready");
		};
	}, []);

	const closeMenu = () => setMenuOpen(false);

	return (
		<main className="club-root" dir="rtl">
			<ClubLogoIntro />
			<a className="club-skip" href="#content">
				تخطّ إلى المحتوى
			</a>

			<header className="club-header">
				<a className="club-brand" href="#home" aria-label="النادي العقاري — الصفحة الرئيسية">
					<Image src="/brand/realclub-mark.png" alt="" width={186} height={330} priority />
					<Image className="club-wordmark" src="/brand/realclub-wordmark.png" alt="النادي العقاري" width={362} height={104} priority />
				</a>
				<nav className="club-nav" aria-label="القائمة الرئيسية">
					<a href="#about">من نحن</a>
					<a href="#services">خدماتنا</a>
					<a href="#work">أعمالنا</a>
					<a href="#community">المجتمع</a>
				</nav>
				<a
					className="club-event-cta"
					href="https://wa.me/966566009911"
					target="_blank"
					rel="noreferrer"
				>
					اطلب تنظيم فعاليتك <ArrowUpRight size={16} />
				</a>
				<button
					className="club-menu"
					type="button"
					onClick={() => setMenuOpen((value) => !value)}
					aria-expanded={menuOpen}
					aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
				>
					{menuOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</header>

			{menuOpen && (
				<nav className="club-mobile-menu" aria-label="قائمة الجوال">
					{[
						["من نحن", "#about"],
						["خدماتنا", "#services"],
						["أعمالنا", "#work"],
						["المجتمع", "#community"],
						["تواصل معنا", "#contact"],
					].map(([label, href]) => (
						<a key={href} href={href} onClick={closeMenu}>
							{label}
							<ArrowLeft size={17} />
						</a>
					))}
				</nav>
			)}

			<section className="club-hero" id="home" aria-labelledby="hero-title">
				<div className="club-hero-media">
					<Image src="/project/realclub-hero-enhanced.png" alt="" fill priority sizes="100vw" />
				</div>
				<div className="club-hero-scrim" />
				<div className="club-container club-hero-content">
					<p className="club-eyebrow">مجتمع عقاري مؤثر</p>
					<h1 id="hero-title">
						نصنع فعاليات عقارية
						<br />
						<em>تترك أثراً</em>
						<span>نبني الفرص ونصنع الشراكات</span>
					</h1>
					<p className="club-lead">
						منصة متخصصة في تنظيم الفعاليات العقارية وبناء العلاقات وتوليد الفرص والشراكات وفق رؤية المملكة 2030.
					</p>
					<div className="club-actions">
						<a className="club-primary" href="https://wa.me/966566009911" target="_blank" rel="noreferrer">
							اطلب تنظيم فعاليتك <ArrowUpRight size={17} />
						</a>
						<a className="club-secondary" href="#work">
							شاهد أعمالنا <ArrowLeft size={17} />
						</a>
					</div>
				</div>
			</section>

			<section id="content" className="club-stats" data-club-reveal aria-label="أرقام النادي العقاري">
				<div className="club-container">
					<p className="club-section-label">أكثر من عقد من العمل داخل القطاع العقاري</p>
					<div className="club-stat-grid">
						{[
							["+20", "افتتاح وملتقى"],
							["+2000", "مستفيد من البرامج"],
							["+800", "متخصص في المجتمع"],
							["+20", "مذكرة تعاون"],
							["+100K", "ظهور إعلامي"],
						].map(([value, label]) => (
							<div className="club-stat" key={label}>
								<strong>{value}</strong>
								<span>{label}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="club-chapter club-bone" id="about" data-club-reveal>
				<div className="club-container club-about">
					<div className="club-about-copy">
						<p className="club-section-label club-label-bone">من نحن</p>
						<h2>لماذا النادي العقاري؟</h2>
						<p>
							منصة احترافية متخصصة في تنظيم الفعاليات العقارية وبناء العلاقات وتوليد الفرص والشراكات بين المطورين والمستثمرين، للمساهمة في تحفيز المشاريع النوعية ورفع جودة المخرجات العقارية.
						</p>
					</div>
					<div className="club-about-media">
						<Image
							className="club-about-main"
							src="/project/about-primary.jpg"
							alt="أعضاء النادي العقاري خلال إحدى فعاليات النادي"
							loading="lazy"
							width={700}
							height={475}
						/>
						<Image
							className="club-about-inset"
							src="/project/about-secondary.jpg"
							alt="كلمة منظّم حفل افتتاح مشروع عقاري"
							loading="lazy"
							width={700}
							height={475}
						/>
					</div>
				</div>
				<div className="club-container club-values">
					{["تخصص في القطاع العقاري", "خبرة في تنظيم وإدارة الفعاليات", "تسويق وانتشار", "ظهور وتأثير إعلامي", "علاقات نوعية ومهنية", "فرص عقارية واعدة"].map((value) => (
						<div key={value}>{value}</div>
					))}
				</div>
			</section>

			<section className="club-story club-bone" data-club-reveal>
				<div className="club-container club-story-head">
					<div>
						<p className="club-section-label club-label-bone">قصتنا</p>
						<h2>من مبادرة عقارية إلى علامة تجارية مسجّلة</h2>
					</div>
					<p>أكثر من عقد من العمل داخل القطاع العقاري السعودي، من لقاءات غير رسمية إلى شركة متخصصة في تنظيم الفعاليات.</p>
				</div>
				<Image className="club-story-image" src="/project/trust.jpg" alt="حضور النادي العقاري في معرض سيريدو العقاري بالدمام" width={1500} height={643} />
				<div className="club-container club-timeline">
					{[
						{
							year: "2014",
							title: "البداية كمبادرة",
							text: "مجموعة مهتمة بالمجال العقاري تتبادل الخبرات وتطرح الأفكار والحلول التي تسهم في تنمية القطاع.",
						},
						{
							year: "2021",
							title: "علامة تجارية مسجّلة",
							text: "تسجيل المبادرة لدى الهيئة السعودية للملكية الفكرية باسم «النادي العقاري».",
						},
						{
							year: "2024",
							title: "شركة متخصصة",
							text: "الانتقال إلى شركة تختص في تنظيم الفعاليات العقارية وبناء الفرص والشراكات.",
						},
					].map((item) => (
						<article key={item.year}>
							<span>{item.year}</span>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</article>
					))}
				</div>
			</section>

			<section className="club-services" id="services" data-club-reveal>
				<div className="club-services-media">
					<Image src="/project/services-bg.jpg" alt="" width={1600} height={700} />
				</div>
				<div className="club-services-scrim" />
				<div className="club-container club-services-content">
					<div className="club-services-head">
						<div>
							<p className="club-section-label">خدماتنا</p>
							<h2>إدارة متكاملة لفعالياتك بأسلوب استثنائي</h2>
						</div>
						<p>من تجهيز الموقع حتى التغطية الإعلامية، نتولى كل تفصيلة تصنع الفارق في يوم مشروعك.</p>
					</div>
					<div className="club-service-grid">
						{services.map((service, index) => (
							<article key={service.title}>
								<span>{String(index + 1).padStart(2, "0")}</span>
								<h3>{service.title}</h3>
								<p>{service.text}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="club-work club-ink" id="work" data-club-reveal>
				<div className="club-container club-work-head">
					<div>
						<p className="club-section-label">أعمالنا</p>
						<h2>بصمتنا في أبرز المشاريع العقارية</h2>
					</div>
					<p>حفلات افتتاح وإطلاق ومعارض عقارية نفّذها النادي في المنطقة الشرقية.</p>
				</div>
				<div className="club-container club-project-grid">
					{clubProjects.map((project) => (
						<article className="club-project" key={project.slug}>
							<Link className="club-project-link" href={`/projects/${project.slug}`} aria-label={`عرض تفاصيل ${project.title}`}>
								<Image src={project.image} alt={project.title} width={1500} height={1000} />
								<div className="club-project-meta">
									<span>{project.year}</span>
									<span>{project.location}</span>
								</div>
								<h3>{project.title}</h3>
								<p>{project.type} · {project.client}</p>
								<span className="club-project-status">مشروع موثق لدى النادي</span>
							</Link>
						</article>
					))}
				</div>
			</section>

			<section className="club-community" id="community" data-club-reveal>
				<div className="club-community-media">
					<Image src="/community/community-bg.jpg" alt="مجتمع النادي العقاري" width={1920} height={1080} loading="lazy" />
				</div>
				<div className="club-container club-community-content">
					<p className="club-section-label">مجتمع النادي العقاري</p>
					<h2>مجتمع مهني.. انتقائي وفعّال</h2>
					<p>
						مساحة تجمع المهتمين والممارسين في القطاع العقاري لتبادل الخبرات واستكشاف الفرص وبناء الشراكات الاستراتيجية.
					</p>
					<a className="club-primary" href="https://wa.me/966566009911" target="_blank" rel="noreferrer">
						اطلب الانضمام <ArrowUpRight size={17} />
					</a>
				</div>
			</section>

			<footer className="club-footer" id="contact">
				<div className="club-container club-footer-grid">
					<div>
						<Image src="/brand/realclub-logo-stacked.png" alt="النادي العقاري — The Real Estate Club" width={362} height={444} />
						<p>النادي العقاري.. فعاليات عقارية | فرص وشراكات.</p>
					</div>
					<div>
						<p className="club-section-label">تواصل معنا</p>
						<a href="tel:+966566009911">
							<Phone size={15} /> 0566009911
						</a>
						<a href="mailto:info@realclub.sa">
							<Mail size={15} /> info@realclub.sa
						</a>
						<p>حي المزروعية — الدمام</p>
					</div>
					<div>
						<p className="club-section-label">تابعنا</p>
						<a href="https://www.instagram.com/realclubsa" target="_blank" rel="noreferrer">
							إنستغرام
						</a>
						<a href="https://www.linkedin.com/company/realclubsa" target="_blank" rel="noreferrer">
							لينكد إن
						</a>
					</div>
				</div>
				<div className="club-container club-footer-bottom">
					<span>© 2026 النادي العقاري</span>
					<span>جميع الحقوق محفوظة</span>
				</div>
			</footer>
		</main>
	);
}
