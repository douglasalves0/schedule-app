import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { v4 as uuidv4 } from 'uuid';
import { delay, checkDate } from "src/utils/functions";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SucessSchedule } from "src/utils/constants";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from "./save.session.message.method";

export class HandleTypeNewMessage extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        var answer = await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 1);
        const userDateMessage = answer[0];
        const userWantedDate = new Date(checkDate(userDateMessage.message));
        var botMessage = `Informações da notificação:\nData: ${userWantedDate.toLocaleString()}\nMensagem: ${userMessage}`;

        await this.saveMessage(botNumber, userNumber, botMessage, sessionId);
        await delay(1);
        await this.saveMessage(botNumber, userNumber, SucessSchedule, sessionId);

        const givenCode = await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 3);
        const givenCodeSchedule = await scheduleRepo.findPendingSchedulesByCodeByUserNumber(userNumber, givenCode[0].message);
        const givenCodeScheduleId = givenCodeSchedule.id;

        await scheduleRepo.changeDateById(givenCodeScheduleId, userWantedDate);
        await scheduleNotifyRepo.changeMessageByScheduleId(givenCodeScheduleId, userMessage);
        
        sendMessage(userNumber, botMessage);
        sendMessage(userNumber, SucessSchedule);

    }
}