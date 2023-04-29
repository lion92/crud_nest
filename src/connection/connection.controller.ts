import {Body, Controller, Get, Post} from '@nestjs/common';
import {ConnectionService} from "./connection.service";
import {UserDTO} from "../dto/UserDTO";

@Controller('connection')
export class ConnectionController {
    constructor(private readonly connectionService: ConnectionService) {
    }

    @Post('/signup')
    async signup(@Body() user: UserDTO) {
        await this.connectionService.signup(user).catch(reason => reason)
        return 'ok'
    }

    @Post('/login')
    async login(@Body() user: UserDTO): Promise<UserDTO> {
        return await this.connectionService.login(user).catch(reason => reason)
    }

    @Get()
    async getAll(@Body() user: UserDTO): Promise<{ id: number; email: string }[] | { id: number; email: number }[]> {
        return await this.connectionService.findAll()
            .then(value => value
                .map(value1 => {
                    return {
                        "id":
                        value1.id,
                        "email":
                        value1.email
                    }
                }))
    }

}
