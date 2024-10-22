const data = {
  avatar: "images/avatar.jpg",
  name: "Tanmay Tambat",
  titleString: "Tanmay's Portfolio",
  about: `Hi there! I'm a Computer Engineering student with a huge passion for technology and problem-solving. I specialize in full-stack web development using the MERN stack and am currently diving into cybersecurity to help protect our digital world. I’m excited to contribute, learn, and grow in the tech industry. Let’s connect and explore the bright future of technology together! 😊🚀`,
  descriptors:
    "Aspiring Computer Engineer | Full Stack Web Developer | Tech Enthusiast",
  email: "tanmaytambat01@gmail.com",
  github: "https://github.com/OldStager01/",
  linkedin: "https://www.linkedin.com/in/tanmay-tambat",
  resume: "Tanmay_Resume.pdf",
  skills: [
    {
      category: "Programming Languages",
      skills: ["JavaScript", "C++", "C", "Python", "SQL", "Java"],
    },
    {
      category: "Web Technologies",
      skills: ["Node.js", "Express.js", "React.js", "MongoDB", "EJS"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "Postman", "Firebase", "Appwrite", "Vercel", "Netlify"],
    },
  ],
  projects: [
    {
      name: "Mega Blogspot | Blogging Platform",
      description:
        "A production grade blogging platform where users can create, read, update, and delete blog posts. The platform also includes user authentication and authorization features.",
      technologies: ["React", "Appwrite", "Tailwind CSS"],
      githubLink: "https://github.com/OldStager01/mega-blog",
      website: "https://megablogspot.vercel.app/  ",
      images: [
        "images/projects/MegaBlog/MegaBlogHome.jpeg",
        "images/projects/MegaBlog/MegaBlogPost.jpeg",
        "images/projects/MegaBlog/MegaBlogAdd.jpeg",
        "images/projects/MegaBlog/MegaBlogEdit.jpeg",
      ],
    },
    {
      name: "Tree Plantation Management System | NGO Project | Backend API",
      description:
        "The Tree Plantation project connects individuals and NGOs to promote tree planting. It uses Node.js and Express.js for a scalable backend API, Firebase for secure authentication and role management, and Firestore for the database. The OpenMeteo API is integrated to offer real-time weather data for optimal planting conditions.",
      technologies: ["Node.js", "Express.js", "Gemini API", "Firebase"],
      githubLink: "https://github.com/OldStager01/Tree-Plantation",
      images: [
        "images/projects/TreePlantation/TreeHome.jpeg",
        "images/projects/TreePlantation/TreeDash.jpeg",
        "images/projects/TreePlantation/TreePlantation.jpeg",
        "images/projects/TreePlantation/TreeSignin.jpeg",
        "images/projects/TreePlantation/TreeSignup.jpeg",
      ],
    },
    {
      name: "Sattv | Hospital Management System",
      description:
        "This production grade system employs OAuth for secure authentication, utilizes Google Sheets as a database for storing patient and appointment data, and relies on Google Drive for file storage, including medical records and reports. Built with Node.js, Express, and EJS for server-side rendering, this web-based hospital management system enables users to book appointments, view medical records, and manage patient information efficiently.",
      technologies: [
        "Node.js",
        "Express",
        "EJS",
        "OAuth",
        "Google Sheets",
        "Google Drive",
      ],
      githubLink: "https://github.com/OldStager01/Sattv-HMS",
      images: [
        "images/projects/Sattv/SattvDash.jpeg",
        "images/projects/Sattv/SattvList.jpeg",
        "images/projects/Sattv/SattvPatient.jpeg",
        "images/projects/Sattv/SattvRegister.jpeg",
        "images/projects/Sattv/SattvAppnt.jpeg",
      ],
    },
    {
      name: "Personalized Bulk Emailers",
      description:
        "This tool streamlines bulk emailing with high personalization. It offers customizable templates, supports attachments, and tailors content for each recipient, making it perfect for marketing campaigns and customer outreach.",
      technologies: ["Node.js", "Express.js", "EJS", "Gmail API"],
      githubLink: "https://github.com/OldStager01/Personalized_Bulk_Mailer",
      images: [
        "images/projects/PersonalizedBulkMailer/PBM1.jpeg",
        "images/projects/PersonalizedBulkMailer/PBM2.jpeg",
        "images/projects/PersonalizedBulkMailer/PBM3.jpeg",
        "images/projects/PersonalizedBulkMailer/PBM4.jpeg",
        "images/projects/PersonalizedBulkMailer/PBM5.jpeg",
      ],
    },
    {
      name: "Hospital Management System | Firebase ",
      description:
        "A web-based hospital management system that allows users to book appointments, view medical records, and manage patient information.",
      technologies: ["JavaScript", "Firbase"],
      githubLink: "https://github.com/OldStager01/Hospital-Management-System",
      images: [
        "images/projects/HospitalManagementSystem/HMSDash.jpeg",
        "images/projects/HospitalManagementSystem/HMSSignin.jpeg",
        "images/projects/HospitalManagementSystem/HMSSignup.jpeg",
        "images/projects/HospitalManagementSystem/HMSRegister.jpeg",
      ],
    },
    {
      name: "My Town Market",
      description:
        "My Town Market is a website designed to support local businesses by listing their products and services. Built with Node.js, Express, and MongoDB, the platform helps local businesses gain visibility and connect with the community.",
      technologies: ["Node.js", "Express", "MongoDB"],
      githubLink: "https://github.com/OldStager01/My-Town-Market",
      images: [
        "images/projects/MyTownMarket/MTMDash.jpeg",
        "images/projects/MyTownMarket/MTMHome.jpeg",
        "images/projects/MyTownMarket/MTMB1.jpeg",
        "images/projects/MyTownMarket/MTMB2.jpeg",
      ],
    },
    {
      name: "C.S.V. File Parser",
      description:
        "A C++ program that reads a CSV file, filters, sorts, and searches data based on user input. The program uses object-oriented programming concepts to manage data efficiently.",
      technologies: ["C++"],
      githubLink: "https://github.com/OldStager01/CSV-File-Parser",
    },
    {
      name: "Accident Detection and Alert System",
      description:
        "The Accident Detection System is a vehicle safety project designed to detect collisions using ESP, accelerometer, GPS, and GSM technologies. This system provides real-time alerts to emergency services and predefined contacts, enhancing road safety.",
      technologies: ["C++", "ESP32 / Arduino", "GPS", "GSM", "Accelerometer"],
      githubLink: "https://github.com/OldStager01/Accident_Detection_System",
    },
    {
      name: "IOT Enabled Smart Irrigation System",
      description:
        "The Accident Detection System is a vehicle safety project designed to detect collisions using ESP, accelerometer, GPS, and GSM technologies. This system provides real-time alerts to emergency services and predefined contacts, enhancing road safety.",
      technologies: ["C++", "ESP32 / Arduino", "GPS", "GSM", "Accelerometer"],
      githubLink: "https://github.com/OldStager01/Accident_Detection_System",
    },
    {
      name: "Bulb Tester",
      description:
        "The Bulb Testing Project is an Arduino-based system designed for efficient and user-friendly light bulb testing. This project incorporates a keypad and LCD display to provide an interactive interface, making bulb testing straightforward and accessible.",
      technologies: ["C++", "ESP32 / Arduino", "GPS", "GSM", "Accelerometer"],
      githubLink: "https://github.com/OldStager01/Bulb-Tester",
      website: "https://wokwi.com/projects/365885552643451905",
    },
  ],
  education: {
    college: {
      degree: "Bachelor of Technology (B.Tech)",
      major: "Computer Engineering",
      school:
        "K.K Wagh Institute Of Engineering Education and Research, Nashik",
      year: "2022 - 2026",
      cgpa: "9.0",
      courseWork: `Data Structures and Algorithms, Web Development, Database Management Systems, Computer Networks,  Operating Systems, Software Engineering, Computer Architecture`,
    },
    std12th: {
      degree: "Higher Secondary Certificate (HSC)",
      college: "KVN Naik Arts, Commerce and Science College, Nashik",
      year: "2021-2022",
      board: "Maharashtra State Board",
      percentage: "82.33",
      cetPercentile: "95.71",
      courseWork: `Physics, Chemistry, Mathematics, Computer Science`,
    },
    school: {
      degree: "Secondary School Certificate (SSC)",
      school: "Horizon Academy, Nashik",
      year: "2019-2020",
      board: "Maharashtra State Board",
      percentage: "89.80",
      courseWork: `Mathematics, Science, Social Science, English, Hindi, Marathi`,
    },
  },
  certifications: [
    {
      logo: "images/logos/NPTEL_Logo.png",
      name: "Programming in Modern C++",
      organization: "NPTEL",
      rank: "Elite",
      year: "2023",
      preview: "images/certifications/Programming_In_Modern_Cpp.jpg",
    },
    {
      logo: "images/logos/NPTEL_Logo.png",
      name: "Ethical Hacking",
      organization: "NPTEL",
      rank: "Elite",
      year: "2023",
      preview: "images/certifications/Ethical_Hacking.jpg",
    },
    {
      logo: "images/logos/Udemy_Logo.png",
      name: "The Full Stack Web Development Bootcamp - MERN STACK ",
      organization: "Udemy",
      year: "2023",
      preview: "#",
    },
    {
      logo: "images/logos/Google_Logo.png",
      name: "Google Cloud Study Jam program - 2023",
      organization: "Google Cloud",
      year: "2023",
      preview: "images/certifications/STUDY_JAM_CERTIFICATES_67-67.jpg",
    },
    {
      logo: "images/logos/AICTE_Logo.png",
      name: "Exposure to Smart Manufacturing, Machines Tools",
      organization: "AICTE - Idea Lab",
      year: "2023",
      preview: "images/certifications/Idea_Lab_Course.jpg",
      rank: "B+",
    },
    {
      logo: "images/logos/Matlab_Logo.png",
      name: "Matlab Onramp Course",
      organization: "Matlab",
      year: "2023",
      preview: "images/certifications/MatLab_OnRamp_Certificate.jpg",
    },
  ],
  courses: [
    {
      name: "The Full Stack Web Development Bootcamp 2024 - MERN STACK",
      description:
        "Fullstack web development MERN STACK, ChatGPT, Node/Express, React, MongoDB, Javascript, HTML/CSS.",
      technologies: [
        "React",
        "Node.js",
        "EJS",
        "MongoDB",
        "Express",
        "JavaScript",
        "HTML/CSS",
      ],
      tutor: "Masyntech Coding School",
      platform: "Udemy",
      year: "2023",
      preview:
        "https://www.udemy.com/course/fullstack-web-development-course-projects-base",
    },
    {
      name: "Chai aur Javascript Backend",
      tutor: "Hitesh Chaudhary",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "RESTful APIs",
      ],
      platform: "YouTube",
      year: "2024",
      preview:
        "https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
    },
    {
      name: "Chai aur React",
      tutor: "Hitesh Chaudhary",
      technologies: ["React"],
      platform: "YouTube",
      year: "2024",
      preview:
        "https://www.youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
    },
    {
      name: "Chai aur Javascript",
      tutor: "Hitesh Chaudhary",
      technologies: ["JavaScript"],
      platform: "YouTube",
      year: "2021",
      preview:
        "https://www.youtube.com/playlist?list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37",
    },
    {
      name: "Programming in Modern C++",
      tutor: "Prof. Partha Pratim Das",
      technologies: ["C++"],
      platform: "NPTEL",
      year: "2023",
      preview: "https://onlinecourses.nptel.ac.in/noc22_cs43/preview",
    },
    {
      name: "Ethical Hacking",
      tutor: "Prof. Indranil Sen Gupta",
      technologies: ["Computer Networks", "Cyber Security", "Ethical Hacking"],
      platform: "NPTEL",
      year: "2023",
      preview: "https://onlinecourses.nptel.ac.in/noc22_cs13/preview",
    },
  ],
  competitions: [
    {
      name: "Peripheraton 1.0 2023 - Hackathon",
      date: "May 2023",
      organization: "S.P.I.T., Mumbai",
      achievement: "Finalist",
      projectSummary:
        "Prototyped and Developed an AI-powered and IOT enabled Smart Irrigation System that optimizes water usage by automatically adjusting irrigation based on real-time data from soil, weather, and plant conditions.",
      repoLink:
        "https://github.com/OldStager01/IOT-Enabled-Smart-Irrigation-System",
      certificate: "images/competitions/Peripherathon_Tanmay_Tambat.jpg",
    },
    {
      name: "Coda-a-Thon 2023 - Coding Contest",
      date: "Apr 2023",
      organization: "K.K Wagh Institute Of Engineering Education and Research",
      achievement: "1st Place",
      projectSummary:
        "Tackled a set of algorithmic challenges and coding problems to secure the first position in the coding contest.",
      certificate: "images/competitions/CODATHON_C++_Infinity.jpg",
    },
    {
      name: "5th Technovation Hackathon 2023",
      date: "Feb 2023",
      organization: "Sharda University, Greater Noida",
      achievement: "Semi-Finalist",
      projectSummary:
        "Ideated an AI-powered and IOT enabled Smart Irrigation System that optimizes water usage by automatically adjusting irrigation based on real-time data from soil, weather, and plant conditions.",
      certificate: "images/competitions/SHAH-1757_TANMAY_DEVENDRA_TAMBAT.jpg",
    },
    {
      name: "Coda-e-Fiesta 2.0 2024 - Coding Contest",
      date: "March 2024",
      organization: "K.K Wagh Institute Of Engineering Education and Research",
      achievement: "2nd Place",
      projectSummary:
        "Secured the second position in the coding contest by solving complex algorithmic problems and coding challenges.",
      certificate: "images/competitions/Code-o-Fiesta_2.0.jpg",
    },
    {
      name: "Web Battles 2024",
      date: "April 2024",
      organization: "K.K Wagh Institute Of Engineering Education and Research",
      achievement: "2nd Place",
      projectSummary:
        "Developed a clone of the given website using HTML, CSS, and JavaScript, securing the second position in the website cloning contest.",
      certificate: "images/competitions/Web_Battles.jpg",
    },
    {
      name: "Code Maze 2024",
      date: "April 2024",
      organization: "K.K Wagh Institute Of Engineering Education and Research",
      achievement: "Finalist",
      projectSummary:
        "Participated in a coding contest that tested problem-solving skills and algorithmic knowledge, reaching the final round of the competition.",
      certificate: "images/competitions/Code_Maze.jpg",
    },
    {
      name: "Blind Coding 2023",
      date: "April 2023",
      organization: "K.K Wagh Institute Of Engineering Education and Research",
      achievement: "1st Place",
      projectSummary:
        "Secured the first position in the Blind Coding contest by solving coding problems without the screen being visible, showcasing strong coding skills and problem-solving abilities.",
      certificate: "images/competitions/Blind_Coding_MIBCS.jpg",
    },
    {
      name: "Ideathon 2023 - Ideation Contest",
      date: "Apr 2023",
      organization: "K.K Wagh Institute Of Engineering Education and Research",
      achievement: "Participant",
      projectSummary:
        "Proposed an innovative idea for a mobile app designed to assist individuals with disabilities by tracking the accessibility of public services such as transportation, restrooms, hotels, and restaurants. This innovative app would provide users with up-to-date information on whether these services are accessible, ensuring a more inclusive and convenient experience for everyone..",
      certificate: "images/competitions/IDEATHON_Equinox.jpg",
    },
  ],
  extracurricular: [
    {
      title: "M.I.B.C.S. Club",
      role: "Technical Head",
      year: "2024 - Present",
      description:
        "Leading and guiding all technical projects, ensuring the smooth implementation of innovative solutions. Responsibilities include coordinating with team members, managing technical resources, and driving the success of the club’s tech initiatives.",
    },
    {
      title: "M.I.B.C.S. Club",
      role: "Core Committee Member",
      year: "2023 - 2024",
      description:
        "Contributed to the planning and execution of various technical events and workshops. Assisted in organizing technical workshops, coding contests, and tech talks, fostering a culture of innovation and learning among students.",
    },
    {
      title: "Stock Audit Activity at A.B.B. India Ltd.",
      role: "Data Entry Coordinator",
      year: "2023",
      description:
        "Assisted in the stock audit activity at A.B.B. India Ltd. by managing and organizing data entry tasks. Ensured the accuracy and integrity of data records, contributing to the successful completion of the audit process.",
    },
  ],
};

export default data;
