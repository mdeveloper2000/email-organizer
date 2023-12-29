const { Router } = require("express")

const emailController = require("../controllers/emailController")
const subscriptionController = require("../controllers/subscriptionController")

const router = Router()

router.get("/", emailController.email_list)
router.get("/email/create", emailController.email_create)
router.post("/email/save", emailController.email_save)
router.get("/email/edit/:_id", emailController.email_edit)
router.post("/email/update", emailController.email_update)
router.post("/email/delete", emailController.email_delete)
router.get("/subscription/create/:_id", subscriptionController.subscription_create)
router.post("/subscription/save", subscriptionController.subscription_save)
router.get("/subscription/read/:_id", subscriptionController.subscription_read)
router.get("/subscription/edit/:subscription_id/:email_id", subscriptionController.subscription_edit)
router.post("/subscription/update", subscriptionController.subscription_update)
router.get("/subscription/delete/:subscription_id/:email_id", subscriptionController.subscription_delete)

module.exports = router