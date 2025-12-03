import React, { useState } from "react";
import type { Language, Theme } from "../App";
import { GiHamburgerMenu } from "react-icons/gi";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const SECTIONS = [
  { id: "about", labelKey: "about" },
  { id: "experience", labelKey: "experience" },
  { id: "projects", labelKey: "projects" },
  { id: "contact", labelKey: "contact" },
] as const;

const NAV_LABELS: Record<
  Language,
  Record<(typeof SECTIONS)[number]["labelKey"], string>
> = {
  en: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
  },
  es: {
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    contact: "Contacto",
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  language,
  onLanguageChange,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const labels = NAV_LABELS[language] ?? NAV_LABELS.en;

  return (
    <header
      className="nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(18px)",
        background:
          theme === "dark"
            ? "linear-gradient(to bottom, rgba(15,23,42,0.9), rgba(15,23,42,0.3), transparent)"
            : "linear-gradient(to bottom, rgba(249,250,251,0.94), rgba(249,250,251,0.86), rgba(249,250,251,0))",
        borderBottom:
          theme === "light"
            ? "1px solid rgba(148,163,184,0.3)"
            : "1px solid rgba(15,23,42,0.85)",
      }}
    >
      <div className="nav__inner">
        <div className="nav__brand" onClick={() => handleScroll("hero")}>
          <div className="nav__logo">DNVR</div>
          <div className="nav__brand-text">
            <span className="nav__brand-title">Carlos Alvarado</span>
            <span className="nav__brand-subtitle">
              Full‑Stack Developer · AWS & TypeScript
            </span>
          </div>
        </div>

        {/* Botón hamburguesa solo para móvil */}
        <button
          type="button"
          className={
            menuOpen
              ? "nav__menu-toggle nav__menu-toggle--open"
              : "nav__menu-toggle"
          }
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
        >
          <GiHamburgerMenu
            size={28}
            color={theme === "light" ? "#000" : "rgba(249, 250, 251, 0.94)"}
          />
        </button>

        <nav className="nav__links">
          {/* Versión escritorio: enlaces en línea + idioma + tema */}
          <div className="nav__links-desktop">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScroll(s.id)}
                className="nav__link"
                type="button"
              >
                {labels[s.labelKey]}
              </button>
            ))}

            <div className="nav__divider" />

            <div className="nav__control-group" aria-label="Language selector">
              <button
                type="button"
                className={
                  language === "en"
                    ? "nav__pill nav__pill--active"
                    : "nav__pill"
                }
                onClick={() => onLanguageChange("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={
                  language === "es"
                    ? "nav__pill nav__pill--active"
                    : "nav__pill"
                }
                onClick={() => onLanguageChange("es")}
              >
                ES
              </button>
            </div>

            <button
              type="button"
              className="nav__theme-toggle"
              onClick={onToggleTheme}
              aria-label={
                theme === "dark"
                  ? "Cambiar a tema claro"
                  : "Cambiar a tema oscuro"
              }
            >
              <span className="nav__theme-icon" aria-hidden="true">
                {theme === "dark" ? "🌙" : "☀️"}
              </span>
            </button>
          </div>

          {/* Versión móvil: panel elegante desplegable */}
          <div className={menuOpen ? "nav__menu nav__menu--open" : "nav__menu"}>
            <div className="nav__menu-section-list">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleScroll(s.id)}
                  className="nav__menu-link"
                  type="button"
                >
                  {labels[s.labelKey]}
                </button>
              ))}
            </div>

            <div className="nav__menu-footer">
              <div
                className="nav__control-group nav__control-group--menu"
                aria-label="Language selector"
              >
                <button
                  type="button"
                  className={
                    language === "en"
                      ? "nav__pill nav__pill--active"
                      : "nav__pill"
                  }
                  onClick={() => onLanguageChange("en")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={
                    language === "es"
                      ? "nav__pill nav__pill--active"
                      : "nav__pill"
                  }
                  onClick={() => onLanguageChange("es")}
                >
                  ES
                </button>
              </div>

              <button
                type="button"
                className="nav__theme-toggle nav__theme-toggle--menu"
                onClick={onToggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Cambiar a tema claro"
                    : "Cambiar a tema oscuro"
                }
              >
                <span className="nav__theme-icon" aria-hidden="true">
                  {theme === "dark" ? "🌙" : "☀️"}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
