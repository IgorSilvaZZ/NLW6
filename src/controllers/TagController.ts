import { Request, Response } from 'express';
import { CreateTagsService } from '../services/CreateTagsService';
import { ListTagsService } from '../services/ListTagsService';

class TagController {

    async handle(req: Request, res: Response){

        const { name } = req.body;

        const createTagsService = new CreateTagsService();

        const tag = await createTagsService.execute(name);

        return res.status(201).json(tag);

    }

    async listTags(req: Request, res: Response){

        const listTagService = new ListTagsService();

        const tag = await listTagService.execute();

        return res.status(200).json(tag);

    }

}

export { TagController }