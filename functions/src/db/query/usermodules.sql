-- name: SaveModule :exec
INSERT INTO usermodules
(module_code, semester_taken, user_id)
VALUES ($1, $2, $3);