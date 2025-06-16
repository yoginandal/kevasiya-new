const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    "Backend server is running correctly. This is not the frontend website."
  );
});

// Helper function for consistent error handling
const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "An internal server error occurred" });
};

// --- Categories Routes ---

// GET all categories
app.get("/api/categories", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY name");
    res.json(rows);
  } catch (err) {
    handleError(res, err);
  }
});

// POST a new category
app.post("/api/categories", async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const [result] = await db.query(
      "INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)",
      [name, slug, description]
    );
    res.status(201).json({ id: result.insertId, name, slug, description });
  } catch (err) {
    handleError(res, err);
  }
});

// PUT (update) a category
app.put("/api/categories/:id", async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    await db.query(
      "UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?",
      [name, slug, description, req.params.id]
    );
    res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    handleError(res, err);
  }
});

// DELETE a category
app.delete("/api/categories/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    handleError(res, err);
  }
});

// --- Subcategories Routes ---

// GET subcategories (optionally by category_id)
app.get("/api/subcategories", async (req, res) => {
  try {
    let query = "SELECT * FROM subcategories ORDER BY name";
    const params = [];
    if (req.query.categoryId) {
      query = "SELECT * FROM subcategories WHERE category_id = ? ORDER BY name";
      params.push(req.query.categoryId);
    }
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    handleError(res, err);
  }
});

// POST a new subcategory
app.post("/api/subcategories", async (req, res) => {
  try {
    const { category_id, name, slug, description } = req.body;
    const [result] = await db.query(
      "INSERT INTO subcategories (category_id, name, slug, description) VALUES (?, ?, ?, ?)",
      [category_id, name, slug, description]
    );
    res
      .status(201)
      .json({ id: result.insertId, category_id, name, slug, description });
  } catch (err) {
    handleError(res, err);
  }
});

// PUT (update) a subcategory
app.put("/api/subcategories/:id", async (req, res) => {
  try {
    const { category_id, name, slug, description } = req.body;
    await db.query(
      "UPDATE subcategories SET category_id = ?, name = ?, slug = ?, description = ? WHERE id = ?",
      [category_id, name, slug, description, req.params.id]
    );
    res.status(200).json({ message: "Subcategory updated successfully" });
  } catch (err) {
    handleError(res, err);
  }
});

// DELETE a subcategory
app.delete("/api/subcategories/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM subcategories WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (err) {
    handleError(res, err);
  }
});

// --- Products Routes ---

// GET products
app.get("/api/products", async (req, res) => {
  try {
    let query = "SELECT * FROM products";
    const params = [];

    if (req.query.slug) {
      query += " WHERE slug = ?";
      params.push(req.query.slug);
    } else if (req.query.subCategoryId) {
      query += " WHERE subcategory_id = ?";
      params.push(req.query.subCategoryId);
    }

    query += " ORDER BY name";

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    handleError(res, err);
  }
});

// POST a new product
app.post("/api/products", async (req, res) => {
  try {
    const {
      subcategory_id,
      name,
      slug,
      description,
      price,
      included_items,
      images,
      packaging,
      image,
    } = req.body;

    const [result] = await db.query(
      "INSERT INTO products (subcategory_id, name, slug, description, price, included_items, images, packaging, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        subcategory_id,
        name,
        slug,
        description,
        price,
        JSON.stringify(included_items),
        JSON.stringify(images),
        packaging,
        image,
      ]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    handleError(res, err);
  }
});

// PUT (update) a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const {
      subcategory_id,
      name,
      slug,
      description,
      price,
      included_items,
      images,
      packaging,
      image,
    } = req.body;
    await db.query(
      "UPDATE products SET subcategory_id = ?, name = ?, slug = ?, description = ?, price = ?, included_items = ?, images = ?, packaging = ?, image = ? WHERE id = ?",
      [
        subcategory_id,
        name,
        slug,
        description,
        price,
        JSON.stringify(included_items),
        JSON.stringify(images),
        packaging,
        image,
        req.params.id,
      ]
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    handleError(res, err);
  }
});

// DELETE a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    handleError(res, err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
