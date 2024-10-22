export interface Skill {
    category: string;
    skills: string[];
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    githubLink: string;
    website?: string;
    images: string[];
}

export interface College {
    degree: string;
    major: string;
    school: string;
    year: string;
    cgpa: string;
    courseWork: string;
}

export interface Std12th {
    degree: string;
    college: string;
    year: string;
    board: string;
    percentage: string;
    cetPercentile?: string;
    courseWork: string;
}

export interface School {
    degree: string;
    school: string;
    year: string;
    board: string;
    percentage: string;
    courseWork: string;
}

export interface Certification {
    logo: string;
    name: string;
    organization: string;
    rank?: string;
    year: string;
    preview: string;
}

export interface Course {
    name: string;
    description: string;
    technologies: string[];
    tutor: string;
    platform: string;
    year: string;
    preview: string;
}

export interface Competition {
    name: string;
    date: string;
    organization: string;
    achievement: string;
    projectSummary: string;
    repoLink: string;
    certificate: string;
}

export interface Extracurricular {
    title: string;
    role: string;
    year: string;
    description: string;
}

export interface Profile {
    avatar?: string;
    name: string;
    about: string;
    descriptors: string;
    email: string;
    github: string;
    linkedin: string;
    skills: Skill[];
    projects: Project[]; // References Project collection
    education: Education[]; // References Education collection
    certifications: Certification[]; // References Certification collection
    courses: Course[]; // References Course collection
    competitions: Competition[]; // References Competition collection
    extracurricular: Extracurricular[]; // References Extracurricular collection
}

export interface Education {
    college: College;
    std12th: Std12th;
    school: School;
}
