  //* TYPE IN TERMINAL FOR: */
      // checking if you're in the root directory of project ||  sqlite3 --version
      // to create election database ||  sqlite3 db/election.db
      // to quit mySQL ||  .quit
      // to run mySQL||  /usr/local/mysql/bin/mysql -u root -p
      // to open data base ||  .open db/election.db
      // to see tables of a database || .schema
      // to print column headers ||  .headers on  ||  .mode column
  //* INSTALL PACKAGES */
      // Initilizes Node.js ||  npm init --y
      // Creates .gitignore and adds node_modules inside ||  echo "node_modules/" > .gitignore
      // Installs express ||  npm install express
      // Installs jest ||  npm install jest --save-dev

      const express = require('express');
      const db = require('./db/database');
      const PORT = process.env.PORT || 3001;
      const app = express();
      
      const apiRoutes = require('./routes/apiRoutes');
      
      
      // EXPRESS MIDDLEWARE//
      // ======================= //
      app.use(express.urlencoded({ extended: false }));
      app.use(express.json());
      // ======================= //
      
      app.use('/api', apiRoutes);
      
      // Default response for any other requests(Not Found) Catch all
      app.use((req, res) => {
        res.status(404).end();
      });
      
      // Start server after DB connection
      db.on('open', () => {
          app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
          });
        });