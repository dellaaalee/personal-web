import "./Community.css";

export default function Community() {
  return (
    <div className="community-root">
      <div className="community-date">January 13, 2026 at 12:41PM</div>

      <div className="community-header">
        <span className="community-pin">📍</span>
        <h1 className="community-title">Community Building</h1>
      </div>

      <div className="community-body">
        <p>
          Building a community is deeply important to me. As a woman and person
          of color in tech, I've experienced how meaningful representation and
          support can be in helping people feel like they belong. Those
          experiences motivate me to create spaces where others feel encouraged
          to explore engineering with confidence.
        </p>
        <p>
          As part of the{" "}
          <a href="https://swe.studentorg.berkeley.edu/" target="_blank" rel="noreferrer">
            Society of Women Engineers
          </a>
          , I serve on the Shadow an Engineer committee, where I help organize
          shadowing opportunities that connect students with practicing engineers
          and give them real insight into what engineering work looks like beyond
          the classroom.
        </p>
        <p>
          I also worked as an{" "}
          <a href="https://www2.eecs.berkeley.edu/Courses/CS61B/" target="_blank" rel="noreferrer">
            Academic Intern for CS 61B
          </a>
          , tutoring students in data structures and supporting them through
          challenging material. In addition, I contributed as a{" "}
            <span className="community-highlight">module developer</span>
            , helping create course materials that make technical concepts more
            approachable and accessible.
          , helping create course materials that make technical concepts more
          approachable and accessible.
        </p>
        <p>
          For me, community is about sharing knowledge, lowering barriers, and
          helping more people see a place for themselves in engineering.
        </p>
      </div>
    </div>
  );
}