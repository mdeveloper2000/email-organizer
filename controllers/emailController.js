const Email = require("../models/Email")
const Subscription = require("../models/Subscription")

const email_list = async(req, res) => {
    const emails = await Email.find({})    
    res.render("emails/index", { title: "E-mail - Home", emails })
}

const email_create = async(req, res) => {
    res.render("emails/create", { title: "E-mail - Create" })
}

const email_save = async(req, res) => {
    try {               
        const { email } = req.body        
        const emailExists = await Email.findOne({ address: email })
        if(!emailExists) {
            const newEmail = await Email.create({ address: email.toLowerCase() })
            if(newEmail) {
                res.status(200).json({ error: 0, message: ""})
            }
            else {
                res.status(400).json({ error: 1, message: "Error trying to register e-mail"})
            } 
        }
        else {
            res.status(400).json({ error: 1, message: "This e-mail is already taken"})
        }
    }    
    catch (error) {        
        res.status(400).json({ error: 0, messsage: "Error trying to register e-mail" })
    }    
}

const email_edit = async(req, res) => {
    const email_id = req.params._id
    try {
        const email = await Email.findById({ _id: email_id })
        if(email) {
            res.render("emails/edit", { title: "E-mail - Edit", email })
        }
        else {
            res.redirect("/")
        }
    }
    catch(error) {
        console.log(error)        
    }
}

const email_update = async(req, res) => {
    const { email_id, address } = req.body
    try {
        const email = await Email.findById({ _id: email_id })
        if(email) {
            email.address = address.toLowerCase()
            await email.save()
            res.status(200).json({ error: 0, message: ""})
        }        
    }
    catch(error) {
        console.log(error)
        res.status(400).json({ error: 1, message: "Error trying to update e-mail. Check if e-mail informed is taken"})
    }
}

const email_delete = async(req, res) => {
    const { email_id } = req.body
    try {
        const email = await Email.findById({ _id: email_id })
        if(email) {
            const subscriptions = await Subscription.find({ email_id: email._id })
            if(subscriptions.length > 0) {
                const text = subscriptions.length === 1 ? "subscription" : "subscriptions"
                res.status(400).json({ error: 1, message: `This e-mail has ${subscriptions.length} ${text} yet`})
            }
            else {
                const deleted = await email.deleteOne({ _id: email_id })
                if(deleted) {
                    res.status(200).json({ error: 0, message: ""})
                }
                else {
                    res.status(400).json({ error: 1, message: "Error trying to delete e-mail"})
                }
            }
        }
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    email_list,
    email_create,
    email_save,
    email_edit,
    email_update,
    email_delete
}