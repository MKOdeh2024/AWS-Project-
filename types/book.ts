import express, { query } from "express";
export namespace BS {
  export interface Book {
    title: string;
    author: string;
    publicationYear: number;
    rate: number;
  }

  export interface user {
    name: string
    age: string
    phoneNumber: string
  }

  export interface Request extends express.Request {
    body: BS.Book;
    query: {
      title: string;
      author: string;
      publicationYear: string;
      rate: string;
    };
  }

  export interface Response extends express.Response {}
}
