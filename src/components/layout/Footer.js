import { useContext } from "react";
import { Container } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const footerClass =
    theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";

  return (
    <footer className={`mt-5 ${footerClass}`}>
      <Container className="text-center">
        <p>
          &copy; {new Date().getFullYear()} Business Cards App. All Rights
          Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
