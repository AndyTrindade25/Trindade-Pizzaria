import { Response, Request } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order as string;

        const detailOrderService = new DetailOrderService();

        const orders = await detailOrderService.execute({order_id})

        return res.json(orders)


        
    }
}

export {DetailOrderController}