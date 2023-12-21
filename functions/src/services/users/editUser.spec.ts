import {
    EditUserArgs,
    createUser,
    deleteUser,
    readUser,
} from "../../db/sqlc/user_sql";
import { EditUserService } from "./editUser";
import { v4 as uuid } from "uuid";
import { pool } from "../../util/setup"

describe("EditUserService", () => {
    it("should throw if the user to update is different from the one in the payload", async () => {
        const username = uuid();

        const service = new EditUserService(
            {
                email: "abc@gmail.com",
                fullName: "abc",
                id: "def",
                major: "",
                semester: 0,
                username
            } as EditUserArgs,
            "abc"
        );

        await expect(service.execute()).rejects.toThrow(
            "You do not have permission to edit the user"
        );
    });

    it("should update the user correctly", async () => {
        const id = uuid();
        const username = uuid();

        await createUser(pool, {
            email: "abc@gmail.com",
            fullName: "Woo Wen Jun",
            id,
            major: "Computer Engineer",
            semester: 0,
        })

        const editUserService = new EditUserService({
            email: "wjranger99@gmail.com",
            fullName: "Wen Jun",
            id,
            major: "Computer Science",
            semester: 1,
            username
        }, id)

        await editUserService.execute()

        const result = await readUser(pool, { id })

        expect(result).toStrictEqual({
            email: "wjranger99@gmail.com",
            fullName: "Wen Jun",
            hasCompletedSetup: true,
            id,
            major: "Computer Science",
            semester: 1,
            username
        })

        await deleteUser(pool, { id })
    });
});
