/* original pledge db: I see pledge_id, user_id, backer_count, pledge_amount.
For SQL, 
 tables:
  pledge_id, username, project_id, pledge_amount, date_created
  project_id, project_name, backer_count, total_pledged, date_created
And for a document-based DB:
  each doc is a project, and it has an array of pledges
  */