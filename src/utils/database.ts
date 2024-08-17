import { DataSource } from "typeorm";
import { Users } from "src/models/models"; 

export const databaseManager = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Kansal@31",
    database: "Nest",
    entities: [Users],
    synchronize: true
})