Backend for proyectoProgra2 (MySQL + Express)

Quick start (local with XAMPP or system MySQL):

1. Copy the example env and (optional) edit values:

   cp .env.example .env

2. Install and start MySQL locally (XAMPP or Homebrew):

   - If using XAMPP: start the MySQL service from XAMPP control panel.
   - If using Homebrew:

     brew install mysql
     brew services start mysql

3. Initialize DB and user (run the SQL in `initdb/`)

   # Using root account (prompts for password if configured):
   mysql -u root -p < backend/initdb/001_create_schema.sql

   The init script will create `game_db`, the `profiles` and `scores` tables and a local user `game_user` configured with `mysql_native_password` for compatibility with local clients.

4. Install the Node dependencies and run the server:

   cd backend
   npm install
   npm run dev

5. The API will be available at http://localhost:4000

DataGrip connection (MySQL):

 - Host: 127.0.0.1
 - Port: 3306
 - User: game_user (or root)
 - Password: game_pass (or your chosen password)
 - Database: game_db

If DataGrip prompts to download a JDBC driver accept the prompt. If you encounter authentication errors, run in mysql:

ALTER USER 'game_user'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'game_pass';
FLUSH PRIVILEGES;

Frontend integration (examples):

From `frontend/perfil.html` you can POST to create/get a profile:

fetch('http://localhost:4000/api/profiles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'ana' })
})
.then(r => r.json()).then(console.log);

To save progress for profile id=1:

fetch('http://localhost:4000/api/profiles/1/progress', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ progress: { nivel: 2, puntos: 120 } })
}).then(r => r.json()).then(console.log);
