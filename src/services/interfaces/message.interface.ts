import { MessageDto } from "src/dtos/message.dto";
import { v4 as uuidv4} from 'uuid';

export interface Message{
    handle(message: MessageDto, sessionId: uuidv4);
}