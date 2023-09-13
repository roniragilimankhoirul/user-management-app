import { app } from "./application/app.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Aplikasi Berjalan di http://localhost:${port}`);
});
