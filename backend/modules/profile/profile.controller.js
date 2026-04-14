import * as profileService from "./profile.service.js"

export const getProfile = async(req, res) => {
    try {
        const userID = req.user.id;

        const profile = await profileService.getProfileByID(userID);
        const tasksSummary = await profileService.getProfileTasksSummary(userID);

        res.status(200).json({
            success: true,
            profile: profile,
            summary: tasksSummary
        })

    } catch(error) {
        res.status(500).json(
            {
                success: false,
                message: "Internal server error: " + error.message
            }
        )
    }
}