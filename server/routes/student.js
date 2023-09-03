const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { authorizeRole, signUser } = require('../middlewares/jwt');
const TemporaryUser = require('../models/temporaryUser');
const studentModel = require('../models/student')
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);
const { Vonage } = require('@vonage/server-sdk')
const vonage = new Vonage({
    apiKey: process.env.VONAGE_APIKEY,
    apiSecret: process.env.VONAGE_APISECRET
})

router.route('/signup').post(async (req, res) => {
    try {
        const userData = req.body;
        const salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);
        const user = await TemporaryUser.create(userData);

        vonage.verify.start({
            number: `91${userData.phone}`,
            brand: "eduCo"
        }).then(resp => {
            res.status(200).json({ message: "Please verify OTP", id: resp.request_id });
        }).catch(err => console.error(err));

        /* await client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${userData.phone}`, channel: "sms" });
        res.status(200).json({ message: "Please verify OTP" }); */


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while signing up." });
    }
});

router.route('/otpverification').post(async (req, res) => {
    try {
        const { otp, id, phone } = req.body;
        vonage.verify.check(id, otp)
            .then(async ({ status }) => {
                if (status === '0') {
                    const student = await TemporaryUser.findOne({ phone: phone });
                    if (!student) {
                        return res.status(404).json({ error: 'verification timeout' });
                    }
                    const { createdAt, ...studentData } = student.toObject();
                    const newStudent = new studentModel(studentData);
                    let newUser = await newStudent.save();
                    newUser = newUser.toObject();
                    delete newUser.password;
                    await TemporaryUser.deleteOne({ phone: phone });
                    signUser(newUser).then((token) => {
                        res.status(200).json({ message: 'OTP verified successfully.', newUser, token });
                    }).catch((err) => {
                        console.log(err);
                        res.status(400).json({ error: 'Token generating failed' })
                    })
                } else {
                    res.status(400).json({ error: 'Invalid OTP.' });
                }
            }).catch((err) => {
                console.error(err);
                res.status(400).json({ error: 'Invalid OTP.' });
            });
        /* await client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: `+91${phone}`, code: otp })
            .then(async ({ status }) => {
                if (status === 'approved') {
                    const student = await TemporaryUser.findOne({ phone: phone });
                    if (!student) {
                        return res.status(404).json({ error: 'verification timeout' });
                    }
                    const { createdAt, ...studentData } = student.toObject();
                    const newStudent = new studentModel(studentData);
                    let newUser = await newStudent.save();
                    newUser = newUser.toObject();
                    delete newUser.password;
                    await TemporaryUser.deleteOne({ phone: phone });
                    signUser(newUser).then((token) => {
                        res.status(200).json({ message: 'OTP verified successfully.', newUser, token });
                    }).catch((err) => {
                        console.log(err);
                        res.status(400).json({ error: 'Token generating failed' })
                    })
                } else {
                    res.status(400).json({ error: 'Invalid OTP.' });
                }
            }); */
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Maximum check attempts reached, Please try again later' });
    }
});

router.route('/otpresend').post(async (req, res) => {
    try {
        const { phone } = req.body;
        await client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${phone}`, channel: "sms" });
        res.status(200).json({ message: "OTP re-sended successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Maximum send attempts reached. Try again after 10 minutes" });
    }
});

router.route('/uniqueNumberCheck').post(async (req, res) => {
    try {
        const { phone } = req.body;
        const student = await studentModel.findOne({ phone: phone });
        if (student) {
            res.status(500).json({ error: "User already exist in this number, try another mobile number." });
        } else {
            res.status(200).json({ message: "Unique number identified." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unfortunate error occured. Please try again later." });

    }
});

router.route('/login').post(async (req, res) => {
    try {
        const { email, password } = req.body;
        let student = await studentModel.findOne({ email: email });
        if (!student) {
            return res.status(400).json({ auth: false, error: 'User does not exist' });
        } else {
            const passwordCheck = await bcrypt.compare(password, student.password);
            if (!passwordCheck) {
                return res.status(400).json({ auth: false, error: "Password incorrect" });
            } else {
                signUser(student).then((token) => {
                    student = student.toObject();
                    delete student.password;
                    res.status(200).json({ student, auth: token });
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({ error: 'token generation failed' });
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed." });
    }
});

module.exports = router;