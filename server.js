const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// const db = require("knex")({
//   client: "pg",
//   connection: {
//     host: process.env.LOCALHOST || "",
//     user: process.env.USER || "",
//     password: process.env.PASSWORD || "",
//     database: process.env.DATABASE || "",
//     port: process.env.PORT || 5432,
//   },
// });

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// select * from pokemon
// app.get("/pokemon", (req, res) => {
//   try {
//     db.select("*")
//       .from("pokemon")
//       .then((data) => res.send(data));
//   } catch (err) {
//     res.send({ message: err });
//   }
// });

app.get("/pokemon", async (req, res) => {
  try {
    const { data, error } = await supabase.from("pokemon").select("*");
    res.send(data);
  } catch (err) {
    res.send({ message: err });
  }
});

// app.get("/pokemon/:name", (req, res) => {
//   const { name } = req.params;
//   try {
//     db.select("*")
//       .from("pokemon")
//       .where({ name })
//       .then((data) => res.send(data));
//   } catch (err) {
//     res.send({ message: err });
//   }
// });

app.get("/pokemon/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const { data, error } = await supabase
      .from("pokemon")
      .select("*")
      .eq("name", name);
    res.send(data);
  } catch (err) {
    res.send({ message: err });
  }
});

app.listen(8080, () => {
  console.log("Express is running");
});
