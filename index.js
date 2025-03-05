const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/address", require("./routes/address.router"));
app.use("/api/cart", require("./routes/cart.router"));
app.use("/api/category", require("./routes/category.router"));
app.use("/api/order", require("./routes/order.router"));
app.use("/api/product", require("./routes/product.router"));
app.use("/api/review", require("./routes/review.router"));
app.use("/api/user", require("./routes/user.router"));

const { errorHandler, notFoundHandler } = require("./middlewares/error.middleware");
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
