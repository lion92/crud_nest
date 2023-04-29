import {Injectable, NotFoundException} from '@nestjs/common';
import {TodoDTO} from "../dto/todoDTO";
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "../entity/todo.entity";
import {Repository} from "typeorm";

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {
    }

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    async findOneBy(id: number): Promise<Todo | null> {
        return await this.todoRepository.findOneBy({id});
    }

    async delete(id: number) {
        await this.verifyId(id);
        await this.todoRepository.delete(id);
    }

    private async verifyId(id: number) {
        let findid = await this.todoRepository.findOneBy({id: id});
        if (!findid) {
            throw new NotFoundException('not found')
        }
    }

    async create(todo: TodoDTO) {
        await this.todoRepository.save(todo).then(value => console.log(value))
    }

    async update(todo: TodoDTO) {
        let findid = await this.todoRepository.findOneBy({id: todo.id});
        if (!findid) {
            throw new NotFoundException('not found')
        }
        let updateResult = await this.todoRepository.update(findid, todo);
        return {message: 'ok', result: updateResult};
    }



}
