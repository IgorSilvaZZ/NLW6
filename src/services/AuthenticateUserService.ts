import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest){

        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({ email });

        if(!user){
            throw new Error('Email/Password incorrect');
        }

        if(!await compare(password, user.password)){
            throw new Error('Email/Password incorrect');
        }   

        const token = sign({ email: user.email }, '4d040153a7bc781052400a3f2119afe2', {
            subject: user.id,
            expiresIn: '1d'
        });

        return token;

    }

}

export { AuthenticateUserService }