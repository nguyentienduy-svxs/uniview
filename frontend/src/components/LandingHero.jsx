import { useId } from 'react'
import { Link } from 'react-router-dom'
import './LandingHero.css'

function FeatureCard({ className, icon, title, caption, to }) {
  return <Link className={`uv-hero-feature ${className}`} to={to}>
    <span className="uv-hero-feature-icon" aria-hidden="true">{icon}</span>
    <span><strong>{title}</strong><small>{caption}</small></span>
    <span className="uv-hero-feature-arrow" aria-hidden="true">↗</span>
  </Link>
}

function PointingCat() {
  const id = useId()
  const paw = '140,715 210,695 285,720 320,765 302,815 252,840 225,900 185,915 140,900 135,865 150,840 120,815 120,770'
  return <span className="uv-hero-cat-window" aria-hidden="true">
    <svg className="uv-hero-cat" viewBox="0 0 1000 1000" focusable="false">
      <defs>
        <mask id={`${id}-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000"><rect width="1000" height="1000" fill="white" /><polygon points={paw} fill="black" /></mask>
        <clipPath id={`${id}-paw`}><polygon points={paw} /></clipPath>
      </defs>
      <image href="/hero/uniview-cat-pointing.png" width="1000" height="1000" mask={`url(#${id}-body)`} />
      <g className="uv-hero-cat-hand"><g clipPath={`url(#${id}-paw)`}><image href="/hero/uniview-cat-pointing.png" width="1000" height="1000" /></g></g>
    </svg>
    <span className="uv-hero-cat-tap" />
    <span className="uv-hero-cat-rays" />
  </span>
}

export default function LandingHero() {
  return <section className="uv-landing-hero" aria-labelledby="landing-hero-title">
    <div className="uv-hero-copy">
      <div className="uv-hero-eyebrow"><span aria-hidden="true" />TƯƠNG LAI KHÔNG CHỈ CÓ MỘT LỰA CHỌN</div>
      <h1 id="landing-hero-title"><span>Hiểu mình hơn.</span><span className="uv-hero-rose">Khám phá nhiều hơn.</span><span className="uv-hero-blue">Chọn có cơ sở hơn.</span></h1>
      <p className="uv-hero-description">Từ sở thích, năng lực đến ngành học và trường đại học, UniView giúp cậu nhìn rõ những lựa chọn, tự trải nghiệm và đưa ra quyết định phù hợp với chính mình.</p>
      <div className="uv-hero-actions">
        <span className="uv-hero-cta-wrap">
          <PointingCat />
          <Link className="uv-hero-primary" to="/assessment"><span className="uv-hero-cta-label">Bắt đầu khám phá</span><span className="uv-hero-cta-arrow" aria-hidden="true">→</span></Link>
        </span>
        <Link className="uv-hero-secondary" to="/universities">Xem các trường <span aria-hidden="true">↗</span></Link>
      </div>
      <p className="uv-hero-note"><span aria-hidden="true">✦</span> Bắt đầu từ sự tò mò. Không cần phải quyết định mọi thứ hôm nay.</p>
      <div className="uv-hero-trust"><span>Khám phá đa hướng</span><span>So sánh lựa chọn</span><span>Thử trước khi quyết định</span></div>
    </div>
    <div className="uv-hero-art" aria-label="Học sinh UniView khám phá ngành học và trường đại học">
      <div className="uv-hero-blob" aria-hidden="true" />
      <img className="uv-hero-student" src="/hero/uniview-student-original.png" alt="Cô bé UniView mặc áo xanh, đeo tai nghe, học tập bên laptop và sách" fetchPriority="high" decoding="async" />
      <span className="uv-hero-spark uv-hero-spark-one" aria-hidden="true">✦</span><span className="uv-hero-spark uv-hero-spark-two" aria-hidden="true">✧</span><span className="uv-hero-spark uv-hero-spark-three" aria-hidden="true">✳</span>
      <FeatureCard className="uv-hero-discover" icon="🧭" title="Khám phá ngành" caption="Đi tìm lựa chọn của cậu" to="/majors" />
      <FeatureCard className="uv-hero-understand" icon="🎓" title="Hiểu bản thân" caption="Bắt đầu từ sở thích" to="/assessment" />
      <FeatureCard className="uv-hero-roadmap" icon="📝" title="Roadmap kiểm chứng" caption="Thử sức với nhiệm vụ thực tế" to="/roadmap" />
      <div className="uv-hero-school-stack">
        <Link className="uv-hero-campus" to="/universities">
          <div className="uv-hero-campus-photo"><img src="/hero/fpt-hcm-campus.jpg" alt="Khuôn viên Đại học FPT TP. Hồ Chí Minh" width="900" height="600" /><span aria-hidden="true">♡</span></div>
          <span className="uv-hero-campus-kicker">KHÁM PHÁ TRƯỜNG HỌC ↗</span><h2>Đại học FPT</h2><p>📍 Cơ sở TP. Hồ Chí Minh</p>
        </Link>
        <Link className="uv-hero-interest" to="/majors"><span>💙 Sở thích</span><strong>Công nghệ <span aria-hidden="true">⌄</span></strong></Link>
      </div>
    </div>
  </section>
}
