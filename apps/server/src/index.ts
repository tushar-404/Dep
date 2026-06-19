import express from "express";
import cors from "cors";
import deployRoutes from "./routes/deploy";
import updateRoutes from "./routes/update";
import viewRoutes from "./routes/view";

const PORT = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());

app.use("/deploy", deployRoutes);
app.use("/update", updateRoutes);
app.use("/view", viewRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});