SELECT *
FROM organizations
WHERE parent = :id
OR id = :id