import express from "express"
import { getGeocoding, getReverseGeocoding } from "../controllers/location.controller"

const router = express.Router()

router.get("/geoconding", getGeocoding)
router.get("/reverGeoconding", getReverseGeocoding)

export default router
