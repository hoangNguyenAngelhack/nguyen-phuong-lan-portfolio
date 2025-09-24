import { LINKS, PERSONAL } from "@/mocks";

export const Footer = () => {
  return (
    <footer className="homepage-footer">
      <div>2025 | {PERSONAL} | PROFESSIONAL ILLUSTRATOR</div>
      <div className="footer-links">
        <a href={LINKS.behance} target="_blank" rel="noopener noreferrer">
          Behance
        </a>
        <span> | </span>
        <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <span> | </span>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};
