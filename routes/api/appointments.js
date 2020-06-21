const express = require('express');
const router = express.Router();
const Appointment = require('../../models/Appointment');
const { check, validationResult } = require('express-validator');


//@route GET appointments
//@desc  all appointments
//@access Public
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')

    }
});


//@route POST appointments/
//@desc  Make appointment
//@access Public
router.post('/', [
    check('date', 'Date is required').not().isEmpty(),
    check('time', 'Time is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('servicegiver', 'Service Provider is required').not().isEmpty(),

],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { date, time, name, email, servicegiver } = req.body;

        try {
            let user = await Appointment.find({ where: { date } }).then();

            if (user) {
                res.status(400).json({ errors: [{ msg: 'App already exists' }] });
            }

            user = new Appointment({
                date,
                time,
                name,
                email

            });

            try {
                await user.save();
                res.status(200).json({ msg: 'Made an appointment' });
            } catch (error) {
                res.status(400).json({ errors: [{ msg: 'Could not make the appointment . Try again later' }] });
            }



        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });

module.exports = router;
