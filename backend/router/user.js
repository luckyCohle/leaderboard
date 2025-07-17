const express = require('express');
const router = express.Router();
const Users = require('../models/user');

router.route("/")
.post(
    async (req,res)=>{
        const userName = req.body.name;
        if(!userName){
            res.status(401).json({
                message:"invalid request body"
            })
            return;
        }

        try {
            const newUser = await Users.create({
                name:userName,
                totalPoints:0,
            })

            res.json({
                newUser
            })
        } catch (error) {
            res.status(400).send({
                message:"error while createing user=>\n"+error
            })
        }
    }
)


module.exports = router;

