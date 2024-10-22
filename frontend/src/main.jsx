import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import SignupPage from "./components/pages/Signup.jsx";
import LoginPage from "./components/pages/Login.jsx";
import Input from "./components/Input.jsx";
import Landing from "./components/pages/Landing.jsx";
import Profile from "./components/pages/Profile.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import {
  PersonalSection,
  ProjectsSection,
  ProjectsForm,
  EducationSection,
  EducationForm,
  CertificationsSection,
  CertificationForm,
  CompetitionsSection,
  CompetitionForm,
  CoursesSection,
  CourseForm,
  ExtracurricularSection,
  ExtracurricularForm,
} from "./components/sections/index.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="" element={<Landing />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<App />}>
            <Route path="profile" element={<Profile />}>
              <Route path="personal" element={<PersonalSection />} />
              <Route path="projects">
                <Route index element={<ProjectsSection />} />
                <Route path="form" element={<ProjectsForm />} />
              </Route>
              <Route path="education">
                <Route index element={<EducationSection />} />
                <Route path="form" element={<EducationForm />} />
              </Route>
              <Route path="certifications">
                <Route index element={<CertificationsSection />} />
                <Route path="form" element={<CertificationForm />} />
              </Route>
              <Route path="competitions">
                <Route index element={<CompetitionsSection />} />
                <Route path="form" element={<CompetitionForm />} />
              </Route>
              <Route path="courses">
                <Route index element={<CoursesSection />} />
                <Route path="form" element={<CourseForm />} />
              </Route>
              <Route path="extracurricular">
                <Route index element={<ExtracurricularSection />} />
                <Route path="form" element={<ExtracurricularForm />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
