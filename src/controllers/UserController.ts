import { Request, Response } from 'express';
import { CreateUserService} from '../services/CreateUserService';
import { ListUserService } from '../services/ListUserService';

class UserController {

    async handle(req: Request, res: Response){
        
        const { name, email, admin, password } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, admin, password });

        return res.status(201).json(user);
    }

    async listUsers(req: Request, res: Response){

        const listUserService = new ListUserService();

        const users = await listUserService.execute();

        return res.status(201).json(users);
    }

}

export { UserController }