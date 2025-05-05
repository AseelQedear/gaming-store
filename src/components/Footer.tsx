import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <footer className="site-footer mt-5 text-light" dir={dir}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Logo & Rights */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="footer-logo">🎮 Cila</h5>
            <p className="small mb-1">© {new Date().getFullYear()} Cila Tech. {t("footer.rights")}</p>
            <p className="small">{t("footer.built_with_love")}</p>
          </div>

          {/* Navigation */}
          <div className="col-md-4 text-center">
            <h6 className="text-accent mb-3">{t("footer.quick_links")}</h6>
            <ul className="footer-links list-unstyled d-flex justify-content-center gap-4 mb-0">
              <li><a href="/" className="text-light text-decoration-none">{t("footer.home")}</a></li>
              <li><a href="/products" className="text-light text-decoration-none">{t("footer.devices")}</a></li>
              <li><a href="/about" className="text-light text-decoration-none">{t("footer.about")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="text-accent mb-3">{t("footer.contact_us")}</h6>
            <p className="mb-1">📧 support@cilagaming.com</p>
            <p className="mb-1">📱 +966 555 123 456</p>
            <div className="social-icons d-flex justify-content-center justify-content-md-end gap-3 mt-2">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-discord"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
