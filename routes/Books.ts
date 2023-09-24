import  express  from "express";
import { User } from "../db/entities/User.js";
import { myDataSource } from "../db/dataSource.js";
import { Profile } from "../db/entities/Profile.js";
import { BS } from "../types/book.js";
import { Book } from "../db/entities/Book.js";
import { Tag } from "../db/entities/Tag.js";


const bookRoute = express.Router();
// Retrieve all
bookRoute.get("/all", (req, res) => {
    const books = myDataSource.manager.find(Book);
    return books ? res.send(books) : res.status(404).send("No books found");
  });
  
  // Retrieve a specific book
  bookRoute.get("/:id", (req, res) => {
    const ID = Number(req.params.id);
    const book = Book.findOneBy({
        id: ID,
    });
    return book? res.send(book) : res.status(404).send("No book found");
  });
  
  // Add a book
  bookRoute.post("/", async(req , res) => {
    try {
      
      let newTag = new Tag();
      newTag.label = req.body.label;
      await Tag.save(newTag);

      let newBook = new Book();
      newBook.title = req.body.title;
      newBook.author = req.body.author;
      newBook.publicationYear = Number(req.body.publicationYear);
      newBook.rate = Number(req.body.rate);
      newBook.Tags.push(newTag);
      Book.save(newBook);
      res.send("New book added with id " + newBook.id);
      res.send("New tag added with id " + newTag.id);
    } catch (error) {
      console.log("User creation failed");
    }
   
   
  });
  
  //Update a book
  bookRoute.put("/:id", async(req, res) => {
    const ID = Number(req.params.id);
    const uniqueBook = await Book.findOne({where:{ id: ID }});
    if (!uniqueBook) {
      return res.status(404).send({ message: "User not found" });
    }
    uniqueBook.title = req.body.title || uniqueBook.title;
    uniqueBook.author = req.body.author || uniqueBook.author
    uniqueBook.publicationYear = Number(req.body.publicationYear) || uniqueBook.publicationYear;
    uniqueBook.rate = Number(req.body.rate) || uniqueBook.rate;

    // Save the updated book entity
    await myDataSource.manager.save(Book, uniqueBook);
  });
  
  //Delete a user:
  bookRoute.delete("/:id", async(req, res) => {
    const ID = Number(req.params.id);
    const book = Book.findOne({where:{id: ID}});
    await myDataSource.manager.remove(book).then(()=>res.send("delete successfully")).catch(()=>res.status(404).send("No book found"));
    
  });
  
  // Query user by name
  bookRoute.get("/:name", (req, res) => {
    const name = req.query.name?.toString();
    const book = Book.findOne({where:{title: name}});
    return book ? res.send(book) : res.status(404).send("No book found");

  });
  
  // Query user by age
  bookRoute.get("/:age", (req, res) => {
    const year = Number(req.query.year?.toString());
    const book = Book.findOne({where:{publicationYear: year}});
    return book ? res.send(book) : res.status(404).send("No book found");

  });

  export default bookRoute;