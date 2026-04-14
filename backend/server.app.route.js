import express from "express"
import user_route from "./modules/user/user.route.js"
import auth_route from "./modules/auth/auth.route.js"
import profile_route from "./modules/profile/profile.route.js"
import tasks_route from "./modules/tasks/tasks.route.js"
import cors from "cors"

const app = express(); 
const PORT = process.env.PORT || 3005;

app.use(cors());

//middleware for parsing incoming request with URL encoded payloads,
//extended = true -> allow parsing nested object & array
app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.use('/api/user', user_route);
app.use('/api/auth', auth_route);
app.use('/api/profile', profile_route);
app.use('/api/tasks', tasks_route);
app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`
    );
});
