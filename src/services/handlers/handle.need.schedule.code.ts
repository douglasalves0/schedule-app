import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { v4 as uuidv4} from "uuid";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ContinueEditing } from '../strategies/strategies.constants';
import { NotFoundSchedule } from "src/utils/constants";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { delay, showDate } from "src/utils/functions";
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from "./save.session.message.method";

export class HandleNeedScheduleCode extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const schedule = await scheduleRepo.findPendingSchedulesByCodeByUserNumber(userNumber, userMessage);
        
        if(schedule == undefined){
            await this.saveMessage(botNumber, userNumber, NotFoundSchedule, sessionId);
            sendMessage(userNumber, NotFoundSchedule);
            return;
        }

        const scheduledMessage = (await scheduleNotifyRepo.findByScheduleId(schedule.id))[0].message;
        var botMessage = "";
        botMessage += "Agendamento encontrado:\n";
        botMessage += "Mensagem: " + scheduledMessage + "\n";
        botMessage += "Agendado para: " + showDate(schedule.date) + "\n";

        await this.saveMessage(botNumber, userNumber, botMessage, sessionId);
        await delay(1);
        await this.saveMessage(botNumber, userNumber, ContinueEditing, sessionId);

        sendMessage(userNumber, botMessage + "\n" + ContinueEditing);
        return;

    }
}