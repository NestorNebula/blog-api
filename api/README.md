<a id="top"></a>

<div align="center">
    <a href="https://github.com/NestorNebula/blog-api/tree/api">
        <img src="../blog-user/public/blog.png" alt="Project Logo" width="100" height="100" />
    </a>
    
<h3>Blog API - API</h3>
</div>

## About

This app is a backend REST API to handle authentication and resources requests from the two Frontend Apps. (See the [Project's README](https://github.com/NestorNebula/blog-api#readme))

### Built With

[![NodeJS](https://skillicons.dev/icons?i=nodejs&theme=light)](https://nodejs.org/)
[![Express](https://skillicons.dev/icons?i=express&theme=light)](https://expressjs.com/)
[![PostgreSQL](https://skillicons.dev/icons?i=postgresql&theme=light)](https://www.postgresql.org/)
[![Prisma](https://skillicons.dev/icons?i=prisma)](https://www.prisma.io/)

#### AND

![JavaScript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=white&style=for-the-badge)
[![Passport](https://img.shields.io/badge/-Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)](https://www.passportjs.org/)
[![JWT](https://img.shields.io/badge/-JWT-000?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)](https://jwt.io/)

## Getting Started

### Prerequisites

- NPM
- NodeJS
- PostgreSQL

### Installation

1. Fork the [Project repository](https://github.com/NestorNebula/blog-api)
2. Clone the forked repository to your local machine
   ```
   git clone git@github.com:<your username>/<repo name>.git
   ```
3. Update remote URL

   ```
   # SSH:
   git remote add upstream git@github.com:blog-api/<repo name>.git

   # HTTPS:
   git remote add upstream https://github.com/blog-api/<repo name>.git
   ```

4. Go to the app directory
   ```
   cd api
   ```
5. Create a postgreSQL database
6. Create a .env file in the project root directory with the following keys

   ```
   PORT=8080
   DATABASE_URL=postgresql://<role_name>:<role_password>@localhost:5432/<your_db_name>

   # This key is the password to become an author an have access to the blog-author app.
   AUTHOR_PWD=<password>

   # JWT secrets
   AT=<secret>
   RT=<secret>

   # If you run the two frontend apps, add their url in these variables.
   ORIGIN1=<origin>
   ORIGIN2=<origin>
   ```

7. Install required packages
   ```
   npm install
   ```
8. Run the following command in your terminal.
   ```
   cd models && npx prisma migrate dev --name localdb_migration
   ```
9. Run the app
   ```
   node --watch app.js
   ```

If an error occurs, make sure you have done everything properly according to this guide. If you think so, you can <a href="https://github.com/NestorNebula/blog-api/issues">Open an Issue</a>.

## Usage

Once the app is up and running, you can access it and make requests with the methods you want.

You can either build frontend apps that can access the API (adding the ORIGIN key in .env file) or run the two Frontend Apps included in the Project.

## Contributing

If you find an issue within the app or want to contribute, you can <a href="https://github.com/NestorNebula/blog-api/issues">Open an Issue</a>.

## License

[![MIT License](https://img.shields.io/badge/License-MIT-darkcyan.svg?style=for-the-badge)](https://github.com/NestorNebula/blog-api/blob/main/LICENSE)

## Contact

Noa Houssier - [Github](https://github.com/NestorNebula)

<p align='right'>(<a href='#top'>go back to the top</a>)</p>
