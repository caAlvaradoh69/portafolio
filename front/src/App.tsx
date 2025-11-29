import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import { ChatbotWidget } from "./components/ChatbotWidget";

export type Theme = "light" | "dark";
export type Language = "en" | "es";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const storedLanguage = window.localStorage.getItem("language") as Language | null;

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    if (storedLanguage === "en" || storedLanguage === "es") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLanguageChange = (next: Language) => {
    setLanguage(next);
  };

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Experience language={language} />
        <Projects language={language} />
        <Contact language={language} />
      </main>
      <Footer />
      <ChatbotWidget language={language} />
    </>
  );
};

export default App;
