import { MessageDto } from "src/dtos/message.dto";

export interface Message{
    handle(message: MessageDto);
}