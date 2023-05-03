import {Router} from 'express';
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import uploadConfig from './config/multer'
import multer from 'multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));


// Rotas Users
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController(). handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)


//Rotas Categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)


//Rotas de Produtos
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)


//Rotas de Order
router.post('/order', isAuthenticated, new CreateOrderController(). handle)


export { router }; 