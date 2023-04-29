import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TodosService} from "./todos.service";
import {TodosInterface} from "../interface/Todos.interface";
import {TodoDTO} from "../dto/todoDTO";
import {Todo} from "../entity/todo.entity";

@Controller('todos')
export class TodosController {
    constructor(private readonly todos: TodosService) {
    }

    @Get()
    async findAll(): Promise<TodosInterface[] | string> {
        return await this.todos.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Todo | null | string> {
        return await this.todos.findOneBy(id).catch(() =>{ return 'desole pas bien'});
    }

    @Delete(':id')
    async remove(@Param('id') id): Promise<string> {
        await this.todos.delete(id).catch(reason => reason);
        return 'ok'
    }

    @Post()
    async create(@Body() todo: TodoDTO) {
        await this.todos.create(todo)
    }
    @Put()
    async update(@Body() todo: TodoDTO) {
        await this.todos.update(todo);
    }

}
