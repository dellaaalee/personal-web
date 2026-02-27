import "./Experience.css";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Capital One",
    location: "McLean, Virginia",
    period: "June 2023 - August 2023",
    bullets: [
      "Implemented a Google Chrome extension for Capital One internal documentation system utilized by 11,000 technical associates and over 3,000 documentation written",
      "Displayed information about author like contact, position, and team using React TS",
      "Use AWS lambda and go to call DevExchange, where Capital One APIs like team inventory registry and employee data lives in",
      "Implemented functionality like expanding, closing extension, injecting iframe into the page in background and content scripts of web extension",
    ],
    stack: ["React", "CSS", "TypeScript", "Go", "AWS"],
  },
  {
    role: "Data Analyst Intern",
    company: "San Francisco Fire Department",
    location: "San Francisco, CA",
    period: "August 2022 - December 2022",
    bullets: [
      "Work with San Francisco Fire Department to improve SFFD Community Paramedicine, leveraging data for insight",
      "Use SFFD paramedic team such as ambulance incidence data, call time, call types, staffing data, geographic data to analyze XXM or incidence where there's no ambulance left to dispatch",
      "Create report to analyze and predict XXM, which will be used to make better department system to reduce the number of XXM",
      "Present our findings to Fire Department stakeholder for policy making and system changes",
    ],
    stack: ["pandas", "SQL", "Seaborn"],
  },
];

export default function Experience() {
  return (
    <div className="exp-root">
      <h1 className="exp-title">Experience</h1>
      <div className="exp-list">
        {experiences.map((e) => (
          <div className="exp-entry" key={e.company}>
            <div className="exp-header">
              <span className="exp-role">{e.role}</span>
            </div>
            <span className="exp-company">{e.company}</span>
            <div className="exp-meta">
              <span>{e.location}</span>
              <span className="exp-dot">•</span>
              <span>{e.period}</span>
            </div>
            <ul className="exp-bullets">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="exp-stack">
              {e.stack.map((s) => (
                <span className="exp-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}