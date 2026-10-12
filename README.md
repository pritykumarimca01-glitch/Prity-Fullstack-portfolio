# Prity Kumari — Java Full Stack Developer Portfolio

Full-stack portfolio: HTML/CSS/JavaScript frontend + Java Spring Boot REST API + MySQL.

## Requirements
- JDK 17+
- IntelliJ IDEA
- MySQL 8+
- Maven (or use IntelliJ's Maven wrapper/import)

## 1. Database
In MySQL Workbench:
```sql
CREATE DATABASE portfolio_db;
```

## 2. Configure backend
Open `portfolio-backend` in IntelliJ. Set environment variables in the Run Configuration:
- `DB_URL=jdbc:mysql://localhost:3306/portfolio_db`
- `DB_USERNAME=your_mysql_username`
- `DB_PASSWORD=your_mysql_password`
- `FRONTEND_ORIGIN=http://127.0.0.1:5500`

Or set these in your operating system environment. Do not commit real passwords.
If environment variables are not set, the app defaults to `root` with an empty password for local testing; change this in `application.properties` or use environment variables.

Run `PortfolioApplication.java`. Backend runs on `http://localhost:8080`.

## 3. Run frontend
Open `portfolio-frontend` in VS Code. Install the VS Code extension **Live Server**. Right-click `index.html` > **Open with Live Server**.
Usually the frontend is `http://127.0.0.1:5500`. If the URL differs, update `API_BASE_URL` in `config.js` or set `FRONTEND_ORIGIN` in backend settings to the actual origin.

## 4. API endpoints
- `GET /api/portfolio` — portfolio content (projects, skills, experience, certificate, links)
- `POST /api/contact` — save a contact message in MySQL
Example JSON:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Hello!"
}
```
- `GET /api/health` — health check

## 5. Customize before publishing
- Update the email placeholder in `index.html`.
- Replace `assets/resume.pdf` with your real resume PDF.
- Replace `assets/profile.jpg` with your photo (optional).
- Update project repository URLs in `PortfolioController.java` to the exact repositories for each project.
- Replace the Credly link with the direct public URL for your badge.
- Only list skills and experience that accurately reflect your work.

## 6. Deploy both parts online
### Backend
Deploy `portfolio-backend` to a Java-capable host such as Render (Web Service) or Railway:
1. Push the backend folder to a GitHub repository.
2. Create a new web service from that repository.
3. Set build command `./mvnw clean package` if wrapper is included, otherwise `mvn clean package`.
4. Set start command `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar` (adjust version if changed).
5. Add environment variables:
   - `DB_URL` = JDBC URL for your managed MySQL instance, including host, port and database name
   - `DB_USERNAME` = database user
   - `DB_PASSWORD` = database password
   - `FRONTEND_ORIGIN` = your published frontend origin, e.g. `https://YOUR-USERNAME.github.io`
6. Ensure the host can reach your managed MySQL instance. Do not use `localhost` for a cloud database.

### Frontend
1. In `portfolio-frontend/config.js`, replace `http://localhost:8080` with your deployed backend URL, e.g. `https://YOUR-BACKEND-SERVICE.example.com` (no trailing slash).
2. Push the frontend files to a public GitHub repository named `portfolio`.
3. GitHub repository > Settings > Pages > Deploy from a branch > `main` > `/(root)` > Save.
4. Site URL will look like `https://YOUR-USERNAME.github.io/portfolio/`.

### Important deployment notes
- GitHub Pages hosts only static files; it does not run Spring Boot or MySQL.
- A public GitHub Pages site can be visited by anyone. Never put database credentials or secrets in frontend files.
- Configure `FRONTEND_ORIGIN` to the exact deployed frontend origin. For a GitHub Pages project site this is `https://YOUR-USERNAME.github.io` (origin does not include `/portfolio`).
- Use a managed MySQL database with network access restricted as much as your host allows. Free tiers and service availability can change.
- Test `GET /api/health` and submit a contact form after deployment.
