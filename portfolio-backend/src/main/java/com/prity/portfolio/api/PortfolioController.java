package com.prity.portfolio.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class PortfolioController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }

    @GetMapping("/api/portfolio")
    public Map<String, Object> portfolio() {
        return Map.of(
            "name", "Prity Kumari",
            "role", "Java Full Stack Developer",
            "location", "Darbhanga, Bihar, India",
            "education", "MCA — IIMT College of Engineering, Greater Noida",
            "summary", "MCA student interested in Java, Spring Boot, REST APIs and database development.",
            "links", Map.of(
                "linkedin", "https://www.linkedin.com/in/prity-kumari121",
                "github", "https://github.com/pritykumarimca01-glitch"
            ),
            "skills", List.of("Java", "Spring Boot", "REST APIs", "MySQL", "JPA/Hibernate", "HTML", "CSS", "JavaScript", "Git", "Postman"),
            "projects", List.of(
                Map.of(
                    "name", "AI Smart Job Portal",
                    "description", "Job portal backend with JWT authentication, role-based access for Admin, Recruiter and Candidate, and job management.",
                    "technologies", List.of("Java", "Spring Boot", "JWT", "MySQL"),
                    "url", "https://github.com/pritykumarimca01-glitch"
                ),
                Map.of(
                    "name", "CineVerse API",
                    "description", "Movie REST API featuring CRUD operations, validation, pagination, sorting and global exception handling.",
                    "technologies", List.of("Java", "Spring Boot", "MySQL", "Swagger"),
                    "url", "https://github.com/pritykumarimca01-glitch"
                )
            ),
            "experience", List.of(
                Map.of(
                    "title", "Full Stack Development Internship",
                    "organization", "TalentXMinds",
                    "duration", "2 months",
                    "description", "Internship experience in full stack development."
                )
            ),
            "certificates", List.of(
                Map.of(
                    "name", "Make Agentic AI Work for You",
                    "organization", "IBM SkillsBuild",
                    "url", "https://www.credly.com/"
                )
            )
        );
    }
}
