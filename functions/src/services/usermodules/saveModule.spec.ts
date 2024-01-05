import { createUser, deleteUser } from "../../db/sqlc/user_sql";
import {
    deleteModule,
    saveModule,
    findModuleById,
} from "../../db/sqlc/usermodules_sql";
import { v4 as uuid } from "uuid";
import { pool } from "../../util/setup";
import { SaveModuleService } from "./saveModule";

describe("EditUserService", () => {
    it("should throw if the module has already been saved", async () => {
        const id = uuid();
        const email = `${uuid()}@gmail.com`;

        await createUser(pool, {
            email,
            fullName: "Woo Wen Jun",
            id,
            major: "Computer Engineer",
            semester: 0,
        });

        await saveModule(pool, {
            moduleCode: "CS2040C",
            userId: id,
            semesterTaken: 7,
        });

        const service = new SaveModuleService(
            {
                moduleCode: "CS2040C",
                semesterTaken: 8,
            },
            id
        );

        await expect(service.execute()).rejects.toThrowError(
            "Module has already been saved"
        );

        await deleteModule(pool, { userId: id, moduleCode: "CS2040C" });

        await deleteUser(pool, { id });
    });

    it("should save the module correctly", async () => {
        const id = uuid();
        const email = `${uuid()}@gmail.com`;

        await createUser(pool, {
            email,
            fullName: "Woo Wen Jun",
            id,
            major: "Computer Engineer",
            semester: 0,
        });

        const service = new SaveModuleService(
            {
                moduleCode: "CS2040C",
                semesterTaken: 8,
            },
            id
        );

        await service.execute();

        const module = await findModuleById(pool, {
            moduleCode: "CS2040C",
            userId: id,
        });

        expect(module).toBeDefined()
        expect(module?.moduleCode).toStrictEqual("CS2040C")
        expect(module?.grades).toBeNull()
        expect(module?.userId).toStrictEqual(id)
    });
});
