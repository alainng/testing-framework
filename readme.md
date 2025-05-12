## Description
Language: Typescript

## Installation
#### Docker
* Git clone repo https://github.com/NemTam/realworld-django-rest-framework-angular#
* Install Docker
* docker compose up -d

#### Testing framework
* Git clone repo https://github.com/alainng/testing-framework/tree/main
* Install Node from https://nodejs.org
* Install cypress ```npm install cypress --save-dev```
* Install typescript ```npm install typescript --save-dev```

## Testing

To run headess, open a terminal, navigate to the cypress repository and run the command: ```npx cypress run --headless```

## Configurations
* Change the baseUrl in ```cypress.config.ts``` to what your desired target Url
* The usernames, passwords and emails are currently randomized every run in ```e2e``` folder but can be improved upon to use external data files

## Notes
No AI was used to create this framework
