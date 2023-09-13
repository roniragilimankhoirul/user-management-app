import { app } from "./application/app.js";
import "dotenv/config";

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Aplikasi Berjalan di http://localhost:${port}`);
});
