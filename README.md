# Line-Management-System

Project was created for NFQ Academy Accession assignment. There were two areas to choose from - Backend and Frontend. 
As I chose Frontend task, I needed to create Queue line App.

There are 4 main pages for different type of users:
 * admin.html - to import initial data and further managament (create new clients)
 * speclialist.html - page for specialists to review their client that was not serviced yet and to mark them as "Serviced"
 * index.html - main page that should be hosted on big screen for clients to see their queue number and which client should go next
 * client.html - additional page for single client to check how long approximately he will need to wait

 ## Technologies used:
 * Bootstrap 4
 * jQuery 3
 * ESLint
 * Babel
 * Webpack
 * npm
 * git

 ## Start development
 Install dependencies:
 ```
 npm ci
 ```
 Start watching JS files:
 ```
 npm run dev
 ```
 NOTE: In order that initial data import would work whole project should be hosted in apache or similar server.

 ## Production build (currently same as dev)
 ```
 npm run prod
 ```
 