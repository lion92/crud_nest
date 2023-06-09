import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodosModule} from "./todos/todos.module";
import {ConnectionModule} from './connection/connection.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'crud_nest',
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true,
        }), TodosModule, ConnectionModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor() {
    }
}
