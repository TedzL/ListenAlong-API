import express from 'express';
import User from '../models/User';
const router = express.Router();

// Getting All
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if (users === null) {
            return res.status(404).json({ message: "Cannot find users" })
        } 
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (user === null) {
            return res.status(404).json({ message: "Cannot find user" })
        } 
        res.json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

// Adding One
router.post('/', async (req, res) => {
    console.log(req);
    try {
        const user = await User.findOne({ id: req.body.id });
        if (user) throw new Error("There is already a user with that ID");
        let newUser = new User({
            id: req.body.id,
            access_token: req.body.access_token,
            refresh_token: req.body.refresh_token,
        });
        newUser = await newUser.save();
        res.status(201).json(newUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (user === null) {
            return res.status(404).json({ message: "Cannot find user" })
        }

        if (req.body.access_token !== null) {
            user.access_token = req.body.access_token;
        }
        if (req.body.refresh_token !== null) {
            user.refresh_token = req.body.refresh_token;
        }
        
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (user === null) {
            return res.status(404).json({ message: "Cannot find user" })
        }
        
        await user.remove();
        res.json({ message: "Deleted User" });
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

export = router;