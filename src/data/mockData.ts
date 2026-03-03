import { Project, Experience, Skill, Testimonial, BlogPost } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Little Amora Caricature',
   description: 'Order & enjoy unique 2D & 3D caricatures. Built with React, Node.js, featuring custom designs, gallery & product management, admin interface, data in MariaDB.',
    image: 'https://littleamorakarikatur.com/api/uploads/images/karya/pak-andre.jpg',
    technologies: ['React', 'TypeScript', 'Express JS', 'MariaDB', 'Node JS'],
    demoUrl: 'https://littleamorakarikatur.com',
    category: 'art',
  },
];

export const experiences: Experience[] = [
  {
    id: 5,
    title: "High school student – Informatics focus",
    company: "SMA NEGERI 1 PABELAN",
    period: "July 2022 - June 2025",
    description: "During high school, I was actively involved in informatics-related activities, contributing to various projects and honing my programming skills. I participated in the National Olympiad in Informatics (OSN) and advanced to the final round, strengthening my problem-solving and algorithmic abilities.",
    technologies: ["Programming", "Algorithms", "Informatics Competitions", "School Projects"],
    current: false,
  },
  {
    id: 4,
    title: 'Introduction to programming',
    company: 'Self-Learning & School Projects',
    period: '2022',
    description: 'First experience with programming, exploring the fundamentals of coding through small projects and exercises. Learned basic web development including HTML, CSS, and JavaScript, and experimented with creating simple websites.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Basic Programming Concepts'],
  },
  {
    id: 3,
    title: 'Freelance illustrator',
    company: 'Self-Employed',
    period: '2023 - 2024',
    description: 'Worked as a freelance illustrator, creating digital illustrations and artworks for clients. Developed skills in digital drawing, vector design, and visual storytelling, delivering high-quality illustrations for various projects.',
    technologies: ['IbisPaint', 'Clip Studio Paint', 'Digital Illustration', 'Anime Art', 'Visual Storytelling'],
    current: false,
  },
  {
    id: 2,
    title: 'Frontend developer',
    company: 'Freelancer',
    period: '2023 - 2024',
    description: 'Developed responsive web applications and improved user experience through modern frontend technologies. Worked closely with designers to implement pixel-perfect designs.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Angular', 'Vue'],
    current: false,
  },
  {
    id: 1,
    title: 'Full Stack Developer & Software Engineer',
    company: 'Freelancer',
    period: '2024 - Present',
    description:
      'Designing and developing reliable digital solutions. Building scalable systems, integrating data sources and services, and ensuring efficient performance. Focused on delivering smooth user experiences and clean, maintainable code.',
    technologies: ['TypeScript', 'Node.js', 'Java', 'Rust'],
    current: true,
  }
];