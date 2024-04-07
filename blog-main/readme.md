
## node server installation

- run ```npm install``` in the root directory
- run migrations with ```npx knex migrate --all```
- seed the tables with data ```npx knex seed:run```
- start the backend server  ```npm start```

## make a migrations file

- ```npx knex migrate:make create_users_table```
- ```npx knex migrate:latest``` //migrate all tables to the database
- ```npx knex migrate:rollback --all``` //drop all tables from the database

## make a seeder file

- ```npx knex seed:make create_user_seeder``` //creating new seeder
- ```npx knex seed:run``` //seed the tables with data

## alter table columns

- ```npx knex migrate:make alter_table_name``` //for adding additional columns to already existing table
