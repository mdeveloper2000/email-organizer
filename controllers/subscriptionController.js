const Email = require("../models/Email")
const Subscription = require("../models/Subscription")

const subscription_create = async(req, res) => {    
    res.render("subscriptions/create", { title: "Subscriptions - Create", _id: req.params._id })
}

const subscription_save = async(req, res) => {
    try {               
        const { _id, item, status, extra } = req.body        
        const subscription = await Subscription.create({ email_id: _id, item, status, extra })
        if(subscription) {
            res.status(200).json({ error: 0, message: "Subscription successfully registered"})
        }
        else {
            res.status(400).json({ error: 1, message: "Error trying to register subscription"})
        }
    }    
    catch (error) {        
        res.status(400).json({ error: 0, messsage: "Error trying to register subscription" })
    }
}

const subscription_read = async(req, res) => {
    const _id = req.params._id
    try {
        const email = await Email.findById({ _id: _id })
        if(email) {
            const subscriptions = await Subscription.find({ email_id: email._id })
            res.render("subscriptions/read", { title: "Subscriptions - Read", email, subscriptions })
        }        
    }
    catch(error) {
        console.log(error)
    }    
}

const subscription_edit = async(req, res) => {
    const subscription_id = req.params.subscription_id
    const email_id = req.params.email_id
    const subscription = await Subscription.findById({ _id: subscription_id })
    if(subscription && subscription.email_id == email_id) {
        res.render("subscriptions/edit", { title: "Subscriptions - Edit", email_id, subscription })
    }
    else {
        res.redirect("/")
    }
}

const subscription_update = async(req, res) => {
    const { subscription_id, email_id, item, status, extra } = req.body
    try {
        const subscription = await Subscription.findById({ _id: subscription_id })
        if(subscription) {
            if(subscription.email_id == email_id) {
                subscription.item = item
                subscription.status = status
                subscription.extra = extra
                subscription.save()
                res.status(200).json({ error: 0, message: "" })
            }
            else {
                res.status(400).json({ error: 1, message: "Error trying to update subscription"})
            }
        }
        else {
            res.redirect("/")
        }
    }
    catch(error) {
        console.log(error)
    }    
}

const subscription_delete = async(req, res) => {
    const subscription_id = req.params.subscription_id
    const email_id = req.params.email_id
    try {
        const subscription = await Subscription.findOne({ _id: subscription_id, email_id })
        if(subscription) {
            const deleted = await subscription.deleteOne({ _id: subscription_id })
            if(deleted) {
                res.redirect(`/subscription/read/${email_id}`)
            }
        }
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    subscription_create,
    subscription_save,
    subscription_read,
    subscription_edit,
    subscription_update,
    subscription_delete
}