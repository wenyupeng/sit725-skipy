const express = require("express");
const router = express.Router();
const MerchantController = require("../controllers/MerchantController");
const { getMenuByMerchantId } = require("../controllers/MenuController");

// Render a merchant details routes
router.get("/:merchantId", MerchantController.renderMerchantDetails);

router.get("/:merchantId/menu", async function (req, res) {
  let merchantId = req.params.merchantId;
  let categoryMap = await getMenuByMerchantId(merchantId);

  res.render("./menu/menu", {
    menu: categoryMap,
  });
});

module.exports = router;
