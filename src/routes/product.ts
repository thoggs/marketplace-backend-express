import { Router } from "express";
import productController from "../controllers/productController";

const productRouter = Router();

productRouter.get('/', productController.index);
productRouter.post('/', productController.create);
productRouter.get('/:id', productController.show);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.destroy);

export default productRouter;
