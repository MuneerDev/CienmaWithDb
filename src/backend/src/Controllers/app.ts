import { Controller, Req, Res, Get, Post, Delete } from "@decorators/express";
import { Request, Response } from "express";
import Movie from "../Entity/Movie";

@Controller("/fav")
export default class MoviesController {
  @Get("/")
  async getAllMovies(@Res() res: Response, @Req() req: Request) {
    const Movies = await Movie.find();
    res.json(Movies);
  }

  @Post("/")
  createMovie(@Res() res: Response, @Req() req: Request) {
    const { id, title, overview, backdrop_path } = req.body.data;
    if (id) {
      const newMovie = new Movie();
      newMovie.id = id;
      newMovie.title = title;
      newMovie.desc = overview;
      newMovie.img = backdrop_path;
      console.log("added");

      newMovie
        .save()
        .then((e: any) => console.log(`created Movie with id: ${e.id}`));
    }
    res.json(req.body);
  }

  @Delete("/:id")
  async deleteMovie(@Res() res: Response, @Req() req: Request) {
    console.log("delete");
    const { id } = req.params;
    Movie.delete({
      id: Number(id),
    }).then((e: any) => {
      if (+e.affected === 0) {
        return res.json({ messege: "error didn't find any" });
      }
      return res.json({ messege: "Finished deleted" });
    });
  }
}
