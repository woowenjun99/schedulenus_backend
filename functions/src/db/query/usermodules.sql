-- name: SaveModule :exec
INSERT INTO usermodules
(module_code, semester_taken, user_id)
VALUES ($1, $2, $3);

-- name: FindModuleById :one
SELECT *
FROM usermodules
WHERE user_id = $1 AND module_code = $2
LIMIT 1 OFFSET 0;

-- name: DeleteModule :exec
DELETE FROM usermodules
WHERE user_id = $1 AND module_code = $2;