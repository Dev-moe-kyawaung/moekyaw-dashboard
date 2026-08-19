import { Download, ShieldCheck } from "lucide-react";
import { certificateData } from "../data/dashboardData";

export default function CertificateDashboard() {
  function printCertificate() {
    window.print();
  }

  return (
    <section className="dashboard-page certificate-page">
      <header className="page-header no-print">
        <div>
          <span className="eyebrow">CREDENTIALS CENTER</span>
          <h1>Professional Certificate</h1>
          <p>
            A clean certificate presentation for your portfolio and
            professional profile.
          </p>
        </div>

        <button className="download-button" onClick={printCertificate}>
          <Download size={16} />
          Print / Save PDF
        </button>
      </header>

      <article className="certificate">
        <div className="certificate-border">
          <div className="certificate-header">
            <span className="certificate-small">
              PROFESSIONAL CERTIFICATION
            </span>
            <ShieldCheck className="certificate-shield" size={44} />
            <span className="certificate-small">CERTIFICATE OF ACHIEVEMENT</span>
          </div>

          <div className="certificate-content">
            <span className="certificate-small">THIS CERTIFIES THAT</span>

            <h2>{certificateData.name}</h2>
            <p className="certificate-burmese">{certificateData.burmese}</p>

            <div className="certificate-line" />

            <span className="certificate-small">
              HAS ACHIEVED THE DESIGNATION OF
            </span>

            <h3>{certificateData.title}</h3>
            <p>{certificateData.skills}</p>

            <div className="certificate-level">
              <span>{certificateData.level}</span>
              <span>12 YEARS EXPERIENCE</span>
              <span>ANDROID ENGINEERING</span>
            </div>
          </div>

          <div className="certificate-footer">
            <div>
              <small>Issued by</small>
              <strong>{certificateData.issuer}</strong>
            </div>

            <div className="certificate-seal">MK</div>

            <div>
              <small>Location</small>
              <strong>{certificateData.location}</strong>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
