import express from "express";
import { DataSource } from "typeorm";
import { attachControllers } from "@decorators/express";
import Movie from "./Entity/Movie";
import NoteController from "./Controllers/app";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

attachControllers(app, [NoteController]).then((e) =>
  console.log("controller attached")
);

const dataSource = new DataSource({
  type: "postgres",
  database: "Movies",
  username: "postgres",
  password: "admin",
  synchronize: true,
  entities: [Movie],
});

async function run() {
  try {
    await dataSource.initialize().then((e) => {
      console.log("Database started");
      app.listen(5001, () => console.log("server started"));
    });
  } catch (e) {
    console.log(`error is : ${e}`);
  }
}

run();
