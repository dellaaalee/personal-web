import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import LinkedIn from "./LinkedIn";
import Email from "./Email";
import Music from "./Music";

export const APP_REGISTRY = {
  about: { id: "about", title: "About Me", Component: About },
  experience: { id: "experience", title: "Experience", Component: Experience },
  projects: { id: "projects", title: "Projects", Component: Projects },
  linkedin: { id: "linkedin", title: "LinkedIn", Component: LinkedIn },
  email: { id: "email", title: "Email", Component: Email },
  music: { id: "music", title: "Music", Component: Music },
};