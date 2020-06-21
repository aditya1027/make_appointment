const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ServiceProvider = require('../../models/ServiceProvider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route POST users/
//@desc  register users
//@access Pulic
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('workhours', 'Work hours are required').not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, workhours } = req.body;

        try {
            let user = await ServiceProvider.findOne({ email });

            if (user) {
                res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new ServiceProvider({
                name,
                email,
                password,
                workhours
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });

//@route GET serviceproviders
//@desc  GET all service providers
//@access Public
router.get('/', async (req, res) => {
    try {
        const serviceproviders = await ServiceProvider.find().select('-password');
        res.json(serviceproviders);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')

    }
})

module.exports = router;
