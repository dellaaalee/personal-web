import "./Projects.css";

const projects = [
  {
    title: "Home Price Analysis Data Project",
    period: "April 2023",
    bullets: [
      "Use 500,000 records of dataset by Cook County Assessor's Office in order to build a model that predicts the monetary value of a home in the county",
      "Perform EDA (Exploratory Data Analysis) on the dataset such as extracting the number of bedrooms and bathrooms from the description",
      "Build a linear regression model that predicts sale prices using training data and features like sale price, repair conditions, bedrooms, garage, and house size",
    ],
    stack: ["pandas", "SQL", "Seaborn"],
  },
  {
    title: "Gitlet (Mock Version of Git)",
    period: "April 2022",
    bullets: [
      "Implemented a version control system that mimics features of Git such as committing, checkout, branches, log, and status using skills like persistence and serialization",
      "Wrote design doc and design diagram detailing the project structure to ensure organization and efficiency",
      "Use an object-oriented approach to represent file contents, commits, and repo state",
      "Implemented merge that puts forked history back together using breadth-first search and split points",
    ],
    stack: ["Java", "git"],
  },
  {
    title: "Ataxx Project",
    period: "March 2022",
    bullets: [
      "Developed a two-person game played with red and blue pieces on a 7 by 7 board using Java",
      "Provided a GUI to enable easier user interaction with the game",
      "Implemented AI for the game using skills like a game tree analysis and alpha-beta pruning, enabling the computer to make good moves using heuristics on static board",
      "Wrote JUnit tests and integration tests to test the functionality of the program",
    ],
    stack: ["Java"],
  },
];

export default function Projects() {
  return (
    <div className="proj-root">
      {projects.map((p) => (
        <div className="proj-entry" key={p.title}>
          <h2 className="proj-title">{p.title}</h2>
          <span className="proj-period">{p.period}</span>
          <ul className="proj-bullets">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="proj-stack">
            {p.stack.map((s) => (
              <span className="proj-tag" key={s}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}