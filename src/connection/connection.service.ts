import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserDTO} from "../dto/UserDTO";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entity/User.entity";
import * as bcrypt from 'bcrypt';
import {LoginDTO} from "../dto/LoginDTO";
import {Todo} from "../entity/todo.entity";

@Injectable()
export class ConnectionService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }


    async signup(user: UserDTO) {
        const userCreate = user;
        const saltOrRounds = 10;
        const password = userCreate.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        userCreate.password = hash
        await this.userRepository.save(userCreate);
    }

    async login(user: LoginDTO): Promise<{ id: number, email: string, prenom: string, nom: string }> {
        const {password, email} = user;
        const userFind = await this.userRepository.findOneBy({email: email})
        if (!userFind) {
            throw new NotFoundException('User Not found')
        } else {
            const match = await bcrypt.compare(password, userFind.password)
            if (!match) {
                throw new UnauthorizedException('illegal')
            } else {
                return {
                    "id": userFind.id,
                    "email": userFind.email,
                    "nom": userFind.nom,
                    "prenom": userFind.prenom
                };
            }
        }


    }
}
