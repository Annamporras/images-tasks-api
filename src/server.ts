import app from "./app";
import { connectMongo } from "./infra/db/mongo"

const PORT = 3000;

async function start() {

    await connectMongo();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

start();