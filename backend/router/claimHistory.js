const express = require('express');
const Claims = require("../models/claimHistory");
const Users = require("../models/user"); 
const router = express.Router();
//route to send sorted leaderboard based on the timeframe selected
router.route("/leaderboard/:period").get(async (req, res) => {
    const period = req.params.period;

    if (!["all", "year", "month"].includes(period)) {
        return res.status(400).send({
            message: "Invalid period in request",
        });
    }

    try {
        let leaderboard;

        if (period === "all") {
            // Fetch from users collection
            leaderboard = await Users.find({})
                .select("name totalPoints imgUrl") 
                .sort({ totalPoints: -1 })
                .limit(20);
        } else {
            const now = new Date();
            let dateFilter;

            if (period === "year") {
                dateFilter = new Date();
                dateFilter.setFullYear(now.getFullYear() - 1);
            } else if (period === "month") {
                dateFilter = new Date();
                dateFilter.setMonth(now.getMonth() - 1);
            }

            leaderboard = await Claims.aggregate([
                { $match: { claimedAt: { $gte: dateFilter } } },
                {
                    $group: {
                        _id: "$userId",
                        name: { $first: "$userName" },
                        totalPoints: { $sum: "$pointsAwarded" },
                    },
                },
                {
                    $lookup: {
                        from: "users", 
                        localField: "_id",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $addFields: {
                        imgUrl: { $arrayElemAt: ["$userDetails.imgUrl", 0] }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        totalPoints: 1,
                        imgUrl: 1
                    }
                },
                { $sort: { totalPoints: -1 } },
                { $limit: 20 },
            ]);
        }

        res.json({ leaderboard });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
});

router.route('/history').post(
    async (req,res)=>{
        const points = req.body.points;
        const userId = req.body.userId;
        const username = req.body.username;
        if(!points || !userId || !username){
            res.status(402).send({message:"Invalid request"});
            return;
        }
        try {
            const claim = await Claims.create({
                pointsAwarded:points,
                userId,
                userName:username
            })
            await Users.updateOne(
                {_id:userId},//find the user
                {$inc:{totalPoints:points}}//updating the total points 
            )


            res.send({claim})
        } catch (error) {
            res.send({
                message:"claim logging failed : "+error
            })
        }

    }
)

module.exports=router;