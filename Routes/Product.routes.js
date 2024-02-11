import { Router } from "express";
import { addProduct } from "../Controllers/product.controller.js";
import { checkId } from "../Middleware/AllMiddleware.js";

const router = Router();
 
router.post('/add-product',checkId,addProduct)

export default router