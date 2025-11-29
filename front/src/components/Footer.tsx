import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(148,163,184,0.2)",
        padding: "18px 16px 26px",
        marginTop: 40,
      }}
    >
      <div
        className="section__inner"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "var(--text-muted)",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span>© {new Date().getFullYear()} Carlos Alvarado · Portafolio</span>
        <span>Hecho con React · preparado para AWS</span>
      </div>
    </footer>
  );
};
