-- name: CreateUser :exec
INSERT INTO users 
(id, email, full_name, major, semester) 
VALUES ($1, $2, $3, $4, $5) ;

-- name: FindUserByEmailOrId :one
SELECT id
FROM users
WHERE id = $1 OR email = $2;

-- name: EditUser :exec
UPDATE users
SET email = $1, full_name = $2, semester = $3, major=$4, username=$5, has_completed_setup = true
WHERE id = $6;

-- name: ReadUser :one
SELECT * FROM users WHERE id = $1;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;
