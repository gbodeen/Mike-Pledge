USE pledges;

DROP TABLE IF EXISTS pledges;
DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
  project_id INT AUTO_INCREMENT PRIMARY KEY,
  project_name VARCHAR(255),
  backer_count MEDIUMINT UNSIGNED DEFAULT 0,
  total_pledged DECIMAL(10,2) DEFAULT 0,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pledges (
  pledge_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  project_id INT NOT NULL,
  pledge_amount DECIMAL(7,2) NOT NULL DEFAULT 0,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





/* original pledge db: I see pledge_id, user_id, backer_count, pledge_amount.
For SQL, 
 tables:
  pledge_id, username, project_id, pledge_amount, date_created
  project_id, project_name, backer_count, total_pledged, date_created
And for a document-based DB:
  each doc is a project, and it has an array of pledges
  */

