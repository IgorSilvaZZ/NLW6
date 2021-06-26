import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';
import { ListUserReceiveComplimentsService } from '../services/ListUserReceiveComplimentsService';
import { ListUserSendComplimentsService } from '../services/ListUserSendComplimentsService';

class ComplimentController {

    async handle(req: Request, res: Response){

        const { tag_id, user_receiver, message } = req.body;
        const { user_id } = req;

        const createComplimentService = new CreateComplimentService();

        const compliment = await createComplimentService.execute({ 
            tag_id,
            user_sender: user_id, 
            user_receiver, 
            message 
        });

        return res.status(201).json(compliment);

    }

    async listUserReceiveCompliments(req: Request, res: Response) {

        const { user_id } = req;

        const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();

        const compliments = await listUserReceiveComplimentsService.execute(user_id);

        return res.status(200).json(compliments);

    }

    async listUserSenderCompliments(req: Request, res: Response) {

        const { user_id } = req;

        const listUserSendComplimentsService = new ListUserSendComplimentsService();

        const compliments = await listUserSendComplimentsService.execute(user_id);

        return res.status(200).json(compliments);

    }

}

export { ComplimentController }