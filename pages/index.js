"use client";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDiscord } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ThemeContext from "./context/ThemeContext";
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { ThemeProvider, useTheme } from "next-themes";

const CloudAnimation = () => {
  const clouds = ["/cloud-8107.png", "/cloud-8120.png"];
  
  const [cloudData, setCloudData] = useState([]);

  useEffect(() => {
    const generateClouds = () =>
      Array.from({ length: 9 }).map((_, index) => ({
        width: Math.random() * 500 + 700,
        height: Math.random() * 300 + 500,
        top: Math.random() * 80,
        left: -150,
        image: clouds[Math.floor(Math.random() * clouds.length)],
        speed: Math.random() * 5 + 10,
      }));

    setCloudData(generateClouds());
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {cloudData.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            backgroundImage: `url('${cloud.image}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
            opacity: 0.9,
          }}
          animate={{
            x: ["0%", "700%"],
          }}
          transition={{
            repeat: Infinity,
            duration: cloud.speed,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const RainyAnimation = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(120)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          background: "linear-gradient(180deg, #5a5a5a, #303030)",
          width: 2,
          height: 14,
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
        }}
        animate={{
          y: ["-10vh", "110vh"],
          x: ["-1vw", "1vw"],
        }}
        transition={{
          repeat: Infinity,
          duration: Math.random() * 1 + 0.7,
          delay: Math.random() * 1,
        }}
      />
    ))}
  </div>
);
const ContentWrapper = ({ children }) => {
  return (
    <div className="relative z-10">
      {children}
    </div>
  );
};


const SkillCard = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out ${
        isHovered ? 'w-[250px]' : 'w-[180px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        h-[400px] p-6
        transition-all duration-300 ease-in-out
        flex flex-col
        ${skill.isHighlighted ? (darkMode ? 'bg-[#38534f]' : 'bg-violet-400') : 'bg-transparent'}
        ${darkMode ? 'dark:border dark:border-gray-700' : ''}
      `}>
        <h3 className={`
          text-lg font-bold mb-8
          ${skill.isHighlighted ? 'text-white' : (darkMode ? 'text-[#38534f]' : 'text-violet-400')}
        `}>
          {skill.category}
        </h3>
        <ul className="mb-4 space-y-2">
          {skill.tools.map((tool) => (
            <li
              key={tool}
              className={`
                transition-transform duration-300 font-semibold
                ${skill.isHighlighted ? 'text-white' : (darkMode ? 'text-[#38534f]' : 'text-violet-400')}
                ${isHovered ? 'translate-x-2' : ''}
              `}
            >
              {tool}
            </li>
          ))}
        </ul>
        {skill.description && (
          <p
            className={`text-sm mt-auto font-medium ${
              skill.isHighlighted ? 'text-white/90' : (darkMode ? 'text-[#38534f]' : 'text-violet-400')
            } transition-opacity duration-300 ease-in-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {skill.description}
          </p>
        )}
      </div>
    </div>
  );
};


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;


  const skills = [
    {
      category: 'Front-end Development',
      tools: ["React.js", "Next.js", "Tailwind CSS"],
      isHighlighted: false,
      description: 'I design and develop responsive web applications using React.js, Next.js, and Tailwind CSS, ensuring an intuitive and seamless user experience across devices.'
    },
    {
      category: 'Back-end Development',
      tools: ["Node.js", "Express.js", "PHP"],
      isHighlighted: true,
      description: 'I develop robust server-side applications using Node.js, Express.js, and PHP, enabling smooth and scalable back-end services.'
    },
    {
      category: 'Databases',
      tools: ["MongoDB", "SQL"],
      isHighlighted: false,
      description: 'I work with databases like MongoDB and SQL to store, query, and manage data efficiently, supporting various application needs.'
    },
    {
      category: "Mobile Development",
      tools: ["Flutter", "Java", "Android Studio", "Firebase", "React (Backend)"],
      isHighlighted: true,
      description: "Building cross-platform mobile applications with a robust backend infrastructure."
    },
    {
      category: "Machine Learning & AI",
      tools: ["CNN", "XGBoost", "TensorFlow", "PyTorch", "Scikit-learn"],
      isHighlighted: false,
      description: "Developing and training machine learning models for predictive analytics and AI applications."
    },
    {
      category: "Software Engineering",
      tools: ["Git", "GitHub", "MVC Architecture", "Agile Methodologies"],
      isHighlighted: true,
      description: "Applying software engineering principles for efficient and maintainable development."
    }
  ];

  const projects = [
     {
        title: "Real Time Chat Application",
        description: "Developed a Real time chat application using socket.io and MERN Stack, This is a chat application that enables the chat functionality to the users to use to communicate with each other",
        github: "https://github.com/it21096884/Real-Time-Chat-App",
        
        
    },
     {
        title: "Rain-Fall Recommendation System",
        description: "Developed using random forest classifier with hyperparameter tuning to recomemnd the rain based on the data",
        github: "https://github.com/it21096884/Rain_fall_recommondation",
        
        
    },
    {
        title: "Glow Up - Salon Management App",
        description: "A Flutter mobile app with a React backend that enhances salon operations. Features include customer feedback analysis, hair damage identification, and AI-powered makeup recommendations.",
        github: "https://github.com/NindukiAbeyrathne/Glowguide-R24-070",
        website:"https://it21096884.github.io/GlowUp/",
        research: "https://www.researchgate.net/publication/388428820_GlowUp_-_Enhancing_Salon_Experience_through_AI-Driven_Customer_Insights?_sg%5B0%5D=NUQtH3No6BrJ8RlQynQo3xAMw1iM-gJFYkOt0mO2cklFQ4yyfp76nsGRzLBa_Qr-moaR5t-0SJM5b-FRPVGwQElhoeMIrKPbMlbpfFxc.9G-bpVKrdEatjxhxIT3Zs125SliXpFlixrq6XPDwRhGQ2B18hFrZ0Uu5Qn5y1CwDgQNa4_W5WY8hWMqeYhfl_Q&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6InB1YmxpY2F0aW9uIiwicGFnZSI6InByb2ZpbGUiLCJwcmV2aW91c1BhZ2UiOiJwcm9maWxlIiwicG9zaXRpb24iOiJwYWdlQ29udGVudCJ9fQ"
    },
    {
      title: "Facial Diagnosis & Makeup Recommendation",
      description: "An AI-powered model that detects facial deformities and recommends personalized makeup solutions. Published research in the IEEE-indexed ICAC conference.",
      github: "https://github.com/NindukiAbeyrathne/Glowguide-R24-070",
      website:"https://it21096884.github.io/GlowUp/",
      research: "https://www.researchgate.net/publication/388441756_Facial_Diagnosis_Skin_Care_and_Makeup_Recommendation_Using_Advanced_Deep_Learning_Techniques?_sg%5B0%5D=NUQtH3No6BrJ8RlQynQo3xAMw1iM-gJFYkOt0mO2cklFQ4yyfp76nsGRzLBa_Qr-moaR5t-0SJM5b-FRPVGwQElhoeMIrKPbMlbpfFxc.9G-bpVKrdEatjxhxIT3Zs125SliXpFlixrq6XPDwRhGQ2B18hFrZ0Uu5Qn5y1CwDgQNa4_W5WY8hWMqeYhfl_Q&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6InB1YmxpY2F0aW9uIiwicGFnZSI6InByb2ZpbGUiLCJwcmV2aW91c1BhZ2UiOiJwcm9maWxlIiwicG9zaXRpb24iOiJwYWdlQ29udGVudCJ9fQ"
    },
    {
        title: "Blush Me - E-commerce Platform",
        description: "Developed an e-commerce platform for cosmetic products. Built a customer mobile app using Java (Android Studio) and an admin web app using React and .NET.",
        github: "https://github.com/NimeshaPriyabandu/EAD-E-commerce_System"
    },
    {
        title: "Online Craft Corner Tourist System",
        description: "A full-stack web app using React, Node.js, and MongoDB, providing a marketplace for Sri Lankan craft businesses.",
        github: "https://github.com/NindukiAbeyrathne/AF_Craft_Coner"
    },
    {
        title: "Online Employee Management System",
        description: "A Java-based system with MVC architecture for managing employee payments and records.",
        github: "https://github.com/it21096884/Employee-Management-System"
    },
    {
        title: "Online Vehicle Management System",
        description: "Developed a vehicle management system using HTML, JavaScript, and SQL for handling rental and payment processes.", 
        github: "https://github.com/it21096884/Online-Vehicle-Management-System"
    }
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`relative w-full min-h-screen ${darkMode ? "bg-[#15111b]" : "bg-white"}`}>
        {!darkMode && <CloudAnimation />}
        {darkMode && <RainyAnimation />}
      <Navbar />
      
    <ContentWrapper>
      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center h-screen px-4 text-center sm:px-6 md:px-8">
      
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`text-sm tracking-wide uppercase ${darkMode ? "text-gray-300" : "text-gray-800"}`}
        >
          Let's build something together
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`mt-2 text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
        >
          Hi, I'm <span className={darkMode ? "text-[#38534f]" : "text-purple-600"}>Oshadi</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`mt-2 text-2xl sm:text-3xl font-semibold ${darkMode ? "text-gray-300" : "text-gray-800"}`}
        >
          Software Engineer Graguated
        </motion.h2><br/>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className={`max-w-3xl mt-6 text-lg sm:text-xl font-medium text-center ${darkMode ? "text-gray-300" : "text-gray-800"}`}
        >
          I am a Software Engineer graduated  From Sri Lanka Institute Of Information Technology ( SLIIT ) with a Second class honers upper devision for the degree Information Technology specialized in software engineering. I'm ready to explore and contribute in various domains. 
          Whether it's software development, data analysis, or artificial intelligence, I am eager to tackle new challenges and make a positive impact.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex mt-6 space-x-6"
        >
          <a href="https://www.linkedin.com/in/oshadi-senevirathna-91b182244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="p-3 transition bg-white rounded-full shadow-lg hover:bg-purple-300 hover:text-white-500">
            <FaLinkedin className="text-2xl text-gray-500" />
          </a>
          <a href="https://github.com/it21096884" target="_blank" rel="noopener noreferrer" className="p-3 transition bg-white rounded-full shadow-lg hover:bg-purple-300 hover:text-white-500">
            <FaGithub className="text-2xl text-gray-500" />
          </a>
          <a href="mailto:oshadi@gmail.com" className="p-3 transition bg-white rounded-full shadow-lg hover:bg-purple-300 hover:text-white-500">
            <FaEnvelope className="text-2xl text-gray-500" />
          </a>
          
        </motion.div>
      </section>

       {/* Who I am */}
       <div id = "about" className="flex flex-col md:flex-row items-center justify-center h-auto md:h-screen px-4 md:px-10 text-center">
       
              {/* Left Section - About Text */}
              <div className="text-center md:w-1/2 md:text-left">
              <h3 className={`text-lg font-semibold ${darkMode ? "text-[#38534f]" : "text-purple-600"}`}>ABOUT</h3>
                <h1 className={`mt-2 ${darkMode ? "text-white" : "text-black"} text-3xl sm:text-4xl font-bold `}>Who I Am</h1>
                <p className= {`mt-4 ${darkMode ? "text-white" : "text-black"}  text-base sm:text-lg max-w-3xl mt-6 text-left text-l`}>
                 Hello! I'm Oshadi, a passionate and driven Software Engineering student with hands-on experience in full-stack development, mobile applications, and machine learning. I enjoy exploring new technologies and leveraging them to create innovative solutions that solve real-world problems.

                 With a strong foundation in React, Flutter, .NET, Node.js, and MongoDB, I have developed and deployed full-stack applications that enhance user experiences and project management skills. <br/><br/>My expertise extends to machine learning and deep learning, where I have worked with CNN, XGBoost, and TensorFlow to build AI-driven models, personalized recommendation systems.

                I thrive in collaborative environments, having worked on multiple projects where I applied Agile methodologies, Git version control, and MVC architecture to deliver efficient and scalable software. My research contributions in AI-powered facial diagnosis and salon management have been published in IEEE-indexed conferences, showcasing my ability to merge academic research with practical applications.
                </p>
                <p className={`mt-4 ${darkMode ? "text-white" : "text-black"} max-w-3xl mt-6 text-left text-l text-gray-1000`}>
                  Thank you for visiting my portfolio website. Feel free to explore my projects, and please don't 
                  hesitate to reach out if you have any questions or opportunities for collaboration!
                </p>
              </div>
        
              {/* Right Section - Profile Image */}
              <div className="mt-8 md:w-1/3 md:mt-0 md:ml-12">
                <img
                  src="/prof.jpeg"
                  alt="Profile"
                  className="shadow-lg rounded-2xl w-full max-w-xs mx-auto"
                />
              </div>
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-8 sm:py-16">
      
        <div className="px-4 sm:px-6 mx-auto max-w-7xl">
        <h2 className={`mb-2 ${darkMode ? "text-[#38534f]" : "text-violet-500"} font`}>SKILLS</h2>
          <h1 className={`mt-2 ${darkMode ? "text-white" : "text-black"} text-3xl sm:text-4xl font-bold`}>What I can do</h1>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <SkillCard
                key={skill.category}
                skill={skill}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-10">
      <div className="px-4 sm:px-6 mx-auto max-w-7xl">
      <h2 className={`mb-2 ${darkMode ? "text-[#38534f]" : "text-violet-500"} font`}>PROJECTS</h2>
      <h1 className={`mt-2 ${darkMode ? "text-white" : "text-black"} text-3xl sm:text-4xl font-bold`}>What I did</h1><br/><br/>
        <div className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 overflow-hidden transition-transform duration-300 ease-in-out transform bg-white shadow-lg dark:bg-gray-800 rounded-2xl group hover:scale-105"
            >
              <div className="relative z-10">
                {/* Project Title */}
                <h3 className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800 transition-colors duration-300 dark:text-white group-hover:text-purple-600">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="mb-6 text-gray-800 transition-colors duration-300 dark:text-gray-300 group-hover:text-gray-1000">
                  {project.description}
                </p>

                {/* Action Links */}
                <div className="flex space-x-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-[#2cffd8] hover:text-purple-800 dark:hover:text-[#38534f] transition-colors duration-300"
                    >
                      <i className="fab fa-github"></i> GitHub
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-[#2cffd8] hover:text-purple-800 dark:hover:text-[#38534f] transition-colors duration-300"
                    >
                      <i className="fas fa-globe"></i> Website
                    </a>
                  )}
                  {project.research && (
                    <a
                      href={project.research}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-[#2cffd8] hover:text-purple-800 dark:hover:text-[#38534f] transition-colors duration-300"
                    >
                      <i className="fas fa-book"></i> Research
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Effect Background (Gradient) */}
              <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-300 opacity-0 bg-gradient-to-t from-purple to-transparent group-hover:opacity-50"></div>
            </div>
          ))}
        </div>
      </div>
</section><br/><br/>



      {/* Contact Section */}
  <section id="contact"  className={`${darkMode ? "bg-gray-90" : "bg-gray-20"} text-white`}>
  <div  className={`${darkMode ? "bg-gray-90" : "bg-gray-20"} max-w-7xl mx-auto px-4 sm:px-6`}>
    {/* Title Section */}
    <h2 className={`mb-2 ${darkMode ? "text-[#38534f]" : "text-violet-500"} font`}>Contact</h2>
    <h1 className={`mt-2 ${darkMode ? "text-white" : "text-black"} text-3xl sm:text-4xl font-bold`}>Let's Connect</h1>
    <div className="mb-8 sm:mb-12 text-center">
    
      <p className={`mt-4 ${darkMode ? "text-white" : "text-black"} text-lg sm:text-xl max-w-2xl mx-auto `}>
        I'm always open to discussing new projects, ideas, or opportunities. Let's chat!
      </p>
    </div>

    {/* Contact Card */}
    <div className="flex justify-center space-x-10">
      
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg shadow-lg w-full md:w-96 p-6 sm:p-8`}>
        <div className="flex justify-center mb-6">
          <img 
            src="./cont.jpg" 
            alt="Business Card"
            className="object-cover w-24 h-24 sm:w-32 sm:h-32 border-4 border-indigo-500 rounded-full"
          />
        </div>

        <h2 className={`${darkMode ? "text-white" : "text-black"} text-2xl sm:text-3xl font-semibold text-center mb-4`}>
          Oshadi Senevirathna
        </h2>
        <p className={`${darkMode ? "text-white" : "text-black"} text-center mb-6`}>
          I'm looking forward to connecting with professionals and discussing new opportunities. Whether it's about collaboration, technology, or innovative projects, let's talk!
        </p>

        <p className={`${darkMode ? "text-white" : "text-black"} font-semibold text-center mb-6`}>
          Open to Work
        </p>

        <div className="flex justify-center space-x-6">
          <a href="https://www.linkedin.com/in/oshadi-senevirathna-91b182244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            className="p-3 text-indigo-500 transition duration-300 transform bg-transparent border-2 border-indigo-500 rounded-full hover:text-indigo-700 hover:scale-105">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href="https://github.com/it21096884" 
            className="p-3 text-gray-400 transition duration-300 transform bg-transparent border-2 border-gray-100 rounded-full hover:text-gray-200 hover:scale-105">
            <FaGithub className="w-6 h-6 " />
          </a>
          <a href="mailto:neeranjala905@gmail.com" 
            className="p-3 text-red-500 transition duration-300 transform bg-transparent border-2 border-red-500 rounded-full hover:text-red-700 hover:scale-105">
            <FaEnvelope className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      </ContentWrapper>
    </div>
    

    </ThemeProvider>
  );
}