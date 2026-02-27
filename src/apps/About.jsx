import "./About.css";

const experience = [
  {
    role: "Software Engineer Intern",
    company: "Capital One",
    period: "June 2023 – August 2023",
    desc: "Built a Chrome extension used by thousands of technical associates to streamline internal workflows.",
  },
  {
    role: "Data Analyst Intern",
    company: "San Francisco Fire Department",
    period: "June 2023 – August 2023",
    desc: "Used data to support decision-making projects across city operations.",
  },
];

const stack = ["React", "CSS", "TypeScript", "Go", "AWS", "pandas", "SQL", "Seaborn"];

export default function About() {
  return (
    <div className="about-root">

      {/* Header */}
      <div className="about-header">
        <div className="about-avatar">
          <span className="about-avatar-emoji">🧑‍💻</span>
        </div>
        <div className="about-identity">
          <h1 className="about-name">Della Lee</h1>
          <p className="about-sub">software engineer &nbsp;·&nbsp; Berkeley, CA</p>
        </div>
      </div>

      {/* Bio */}
      <div className="about-bio">
        <p>
          Hi, my name is Della Lee. I'm a rising junior at{" "}
          <strong>UC Berkeley</strong> studying data science.
        </p>
        <p>
          I enjoy building impactful products that combine engineering, design,
          and data-driven thinking. I'm especially drawn to projects that involve
          learning new systems, solving open-ended problems, and turning ideas
          into real tools people use.
        </p>
        <p>
          At the core, I'm someone who likes to both build and break things —
          experimenting, iterating, and learning through exploration. Thanks for
          stopping by!
        </p>
      </div>

      {/* Experience */}
      <div className="about-section">
        <h2 className="about-section-title">Experience</h2>
        <div className="about-exp-list">
          {experience.map((e) => (
            <div className="about-exp-card" key={e.company}>
              <div className="about-exp-top">
                <span className="about-exp-role">{e.role}</span>
                <span className="about-exp-period">{e.period}</span>
              </div>
              <span className="about-exp-company">{e.company}</span>
              <p className="about-exp-desc">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="about-section">
        <h2 className="about-section-title">Tech Stack</h2>
        <div className="about-stack">
          {stack.map((s) => (
            <span className="about-tag" key={s}>{s}</span>
          ))}
        </div>
      </div>

    </div>
  );
}