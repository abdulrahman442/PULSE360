import { useState, useEffect, useMemo } from "react";
import Reveal from "../components/animations/Reveal";
import { getArticles, getFirstAidGuides, getHealthMyths } from "../services/api";

const CATEGORIES = [
  "All Guides",
  "Disease Prevention",
  "Emergency & First Aid",
  "Maternal & Child Health",
  "Mental Health",
];

function HealthAwareness() {
  const [articles, setArticles] = useState([]);
  const [firstAid, setFirstAid] = useState([]);
  const [myths, setMyths] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Guides");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFirstAidId, setActiveFirstAidId] = useState("fa-001");
  const [revealedMyths, setRevealedMyths] = useState({});

  useEffect(() => {
    async function load() {
      const [art, fa, my] = await Promise.all([
        getArticles(),
        getFirstAidGuides(),
        getHealthMyths(),
      ]);
      setArticles(art);
      setFirstAid(fa);
      setMyths(my);
    }
    load();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      if (selectedCategory !== "All Guides" && art.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(q);
        const matchesSummary = art.summary.toLowerCase().includes(q);
        const matchesCategory = art.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  const toggleMyth = (index) => {
    setRevealedMyths((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const activeFirstAid = firstAid.find((f) => f.id === activeFirstAidId) || firstAid[0];

  return (
    <div className="health-awareness-page">
      {/* Header Banner */}
      <section className="awareness-header-banner">
        <div className="container">
          <Reveal>
            <div className="awareness-header-meta">
              <span className="section-eyebrow">HEALTH LITERACY & EMERGENCY PREPAREDNESS</span>
              <h1>Public Health Education & Guides</h1>
              <p className="page-lead">
                Evidence-based disease prevention guides, certified first aid response
                protocols, and myth-busting intelligence reviewed by clinical experts.
              </p>
            </div>
          </Reveal>

          {/* Search Box */}
          <div className="awareness-search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search health guides, prevention topics, or symptoms (e.g. Water, Stroke, Dengue, Stress)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="awareness-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="btn-clear-search">
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="awareness-category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="awareness-articles-section py-5">
        <div className="container">
          <div className="section-title-row mb-4">
            <div>
              <span className="section-eyebrow">ESSENTIAL GUIDES</span>
              <h2>Certified Health Guides & Prevention Protocols</h2>
            </div>
            <div className="articles-count-badge">
              Showing <strong>{filteredArticles.length}</strong> guides
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="empty-results-box">
              <i className="bi bi-book text-muted display-4"></i>
              <h3>No Articles Found</h3>
              <p>No health guides match your current search and category filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All Guides");
                  setSearchQuery("");
                }}
                className="button button-primary"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <article key={article.id} className="awareness-card-item">
                  <div className="article-top">
                    <span className="article-category-badge">{article.category}</span>
                    <span className="article-read-time">
                      <i className="bi bi-clock me-1"></i> {article.readTime}
                    </span>
                  </div>

                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-summary">{article.summary}</p>

                  <div className="takeaways-box">
                    <strong>Key Highlights:</strong>
                    <ul>
                      {article.keyTakeaways.slice(0, 3).map((item, idx) => (
                        <li key={idx}>
                          <i className="bi bi-check2 text-primary me-1"></i> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="article-footer">
                    <span className="article-date">{article.date}</span>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="btn-read-full-guide"
                    >
                      Read Full Guide <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Section: Emergency First Aid Protocols */}
      <section className="first-aid-section py-5" id="first-aid">
        <div className="container">
          <div className="first-aid-panel">
            <div className="section-heading mb-4 text-center">
              <span className="section-eyebrow">LIFESAVING ACTION</span>
              <h2>
                Interactive First Aid <span className="heading-accent">Protocols</span>
              </h2>
              <p className="max-w-700 mx-auto">
                In medical emergencies, what you do in the first 3 to 5 minutes can determine survival. Select an emergency scenario below to review immediate action steps.
              </p>
            </div>

            {/* Protocol Tabs */}
            <div className="first-aid-tabs-row">
              {firstAid.map((fa) => (
                <button
                  key={fa.id}
                  onClick={() => setActiveFirstAidId(fa.id)}
                  className={`fa-tab-btn ${activeFirstAidId === fa.id ? "active" : ""}`}
                >
                  <i className={`bi ${fa.icon} me-2`}></i>
                  {fa.title.split("(")[0]}
                </button>
              ))}
            </div>

            {/* Protocol Active Card */}
            {activeFirstAid && (
              <div className="active-protocol-card">
                <div className="protocol-card-header">
                  <div className="pch-left">
                    <i className={`bi ${activeFirstAid.icon} pch-icon`}></i>
                    <div>
                      <h3>{activeFirstAid.title}</h3>
                      <span className="pch-sub">Emergency Action Checklist</span>
                    </div>
                  </div>
                  <div className="pch-call">
                    <i className="bi bi-telephone-fill me-1"></i>
                    Always call dispatch: <strong>112 / 911</strong>
                  </div>
                </div>

                <div className="protocol-steps-list">
                  {activeFirstAid.steps.map((step, idx) => (
                    <div key={idx} className="protocol-step-item">
                      <div className="step-counter-circle">{idx + 1}</div>
                      <div className="step-body-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Section: Health Myths vs Clinical Facts */}
      <section className="myths-section py-5">
        <div className="container">
          <div className="section-heading mb-4 text-center">
            <span className="section-eyebrow">TRUTH IN MEDICINE</span>
            <h2>
              Common Health Myths vs <span className="heading-accent">Clinical Facts</span>
            </h2>
            <p className="max-w-700 mx-auto">
              Misinformation can lead to harmful treatment delays. Click each card to reveal the evidence-based medical reality.
            </p>
          </div>

          <div className="myths-grid">
            {myths.map((item, idx) => {
              const isRevealed = revealedMyths[idx];
              return (
                <div
                  key={idx}
                  className={`myth-card ${isRevealed ? "is-revealed" : ""}`}
                  onClick={() => toggleMyth(idx)}
                >
                  <div className="myth-category-pill">{item.category}</div>
                  <div className="myth-side">
                    <div className="myth-label">
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      COMMON MYTH
                    </div>
                    <p className="myth-text">"{item.myth}"</p>
                  </div>

                  <div className="fact-divider">
                    <span>{isRevealed ? "Hide Fact" : "Click to Reveal Fact"}</span>
                    <i className={`bi ${isRevealed ? "bi-chevron-up" : "bi-chevron-down"} ms-1`}></i>
                  </div>

                  {isRevealed && (
                    <div className="fact-side animate-fade-in">
                      <div className="fact-label">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        SCIENTIFIC FACT
                      </div>
                      <p className="fact-text">{item.fact}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Article Reading Modal */}
      {selectedArticle && (
        <div className="modal-backdrop-custom" onClick={() => setSelectedArticle(null)}>
          <div className="article-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <div>
                <span className="article-category-badge mb-2">{selectedArticle.category}</span>
                <h2>{selectedArticle.title}</h2>
                <div className="small text-muted">
                  <i className="bi bi-clock me-1"></i> {selectedArticle.readTime} · Published {selectedArticle.date}
                </div>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="btn-close-modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body-custom">
              <div className="article-modal-content">
                <p className="article-modal-summary lead">{selectedArticle.summary}</p>

                <div className="article-modal-paragraphs">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="takeaways-box my-4">
                  <h4>Key Clinical Takeaways</h4>
                  <ul>
                    {selectedArticle.keyTakeaways.map((item, idx) => (
                      <li key={idx}>
                        <i className="bi bi-check-circle-fill text-primary me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="article-disclaimer">
                  <i className="bi bi-info-circle me-1"></i>
                  Written by certified public health educators for community education. In clinical emergencies, seek direct examination by a licensed medical practitioner.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthAwareness;
