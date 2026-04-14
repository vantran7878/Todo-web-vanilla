import * as authService from "./auth.service.js"


export const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

export const login = async(req, res) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({
            success: true,
            data: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }

}