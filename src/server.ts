import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";
import { sendEmail } from "./utils/email";

const startServer = async () => {
    await connectDB();
    await sendEmail(
        "your-email@gmail.com",
        "SMTP Test",
        "<h1>Mail Test For My Canny Clone's Project</h1>"
    );

    app.listen(env.PORT, () => {
        console.log(`🚀 Server running on port ${env.PORT}`);
    });
};

startServer();