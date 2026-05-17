import React from "react";
import "./Enterprise_projects.css";

const experiences = [
  {
    company: "Accenture",
    role: "Custom Software Engineer",
    client: "NPCIL",
    project: "NPCIL Greenfield Implementation",
    duration: "Current",
    description:
      "Working on SAP S/4HANA Greenfield Implementation involving RICEFW developments, OData services, backend enhancements, Adobe Forms, and enterprise integrations for large-scale ERP transformation initiatives.",
    highlights: [
      "Developing enterprise-grade RICEFW objects",
      "Working with SAP OData and SAP Gateway integrations",
      "Contributing to SAP S/4HANA implementation workflows",
      "Creating backend logic, enhancements, and forms",
    ],
    tech: [
      "SAP ABAP",
      "S/4HANA",
      "OData Integrations",
      "Adobe Forms",
      "Enhancements",
      "SAP Gateway",
      "Reports",
    ],
  },
  {
    company: "Automatic Infotech",
    role: "SAP ABAP Associate",
    clients: "TKSS | HUF | GEDIA",
    project: "Support Projects",
    duration: "Previous Experience",
    description:
      "Handled SAP support and enhancement activities including debugging, issue resolution, production support, and business workflow analysis for enterprise applications.",
    highlights: [
      "Resolved production and support tickets",
      "Worked on debugging and issue analysis",
      "Handled enhancement and support tasks",
      "Supported enterprise SAP workflows",
    ],
    tech: [
      "SAP ABAP",
      "Debugging",
      "Enhancements",
      "Support Tasks",
      "Production Support",
    ],
  },
];

const Enterprise_PROJECTS = () => {
  return (
    <section className="enterprise-section" id="enterprise">
      <div className="enterprise-container">
        <div className="enterprise-header">
          <span className="enterprise-tag">
            Enterprise Experience
          </span>

          <h2>SAP ABAP & S/4HANA Journey</h2>

          <p>
            Building enterprise-grade SAP solutions with experience
            across implementation projects, OData integrations,
            backend development, and business-critical workflows.
          </p>
        </div>

        <div className="enterprise-timeline">
          {experiences.map((exp, index) => (
            <div className="enterprise-card" key={index}>
              <div className="enterprise-top">
                <div>
                  <h3>{exp.company}</h3>
                  <h4>{exp.role}</h4>
                  <p className="enterprise-client">Client: {exp.client}</p>
                </div>

                <span className="enterprise-duration">
                  {exp.duration}
                </span>
              </div>

              <div className="enterprise-project">
                {exp.project}
              </div>

              <p className="enterprise-description">
                {exp.description}
              </p>

              <div className="enterprise-subsection">
                <h5>Key Contributions</h5>

                <ul>
                  {exp.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="enterprise-subsection">
                <h5>Technologies</h5>

                <div className="enterprise-tech">
                  {exp.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="enterprise-note">
          Due to enterprise confidentiality and client data
          security policies, source code, implementation
          screenshots, and internal business details cannot
          be shared publicly.
        </div>
      </div>
    </section>
  );
};

export default Enterprise_PROJECTS;