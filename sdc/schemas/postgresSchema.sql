\c pledges;

DROP TABLE IF EXISTS pledges;
DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR (255),
  backer_count INT DEFAULT 0,
  total_pledged NUMERIC(10,2) DEFAULT 0,
  funding_goal NUMERIC(10,2) DEFAULT 5000,
  deadline TIMESTAMP NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pledges (
  pledge_id SERIAL PRIMARY KEY,
  username VARCHAR (255),
  project_id INT NOT NULL,
  pledge_amount NUMERIC(7,2) NOT NULL DEFAULT 0,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

