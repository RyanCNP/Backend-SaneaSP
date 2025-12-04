
import winston from "winston";
import { Logtail } from '@logtail/node';
import { LogtailTransport } from "@logtail/winston";

const log = process.env.LOGTAIL_TOKEN;
let logtail!: Logtail;
if (log) {
    logtail = new Logtail(log, {
        endpoint: process.env.LOGTAIL_URI,
    });
}

logtail.info('teste');

/** Criando a instância base com formatação */
const baseLogger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, ...rest }) => {
            const meta = Object.keys(rest).length ? JSON.stringify(rest) : '';
            return `[${timestamp}] ${level.toUpperCase()}: ${message} ${meta}`;
        })
    ),
    transports: [new LogtailTransport(logtail)],
});

/** Métodos personalizados */
const logger = {
    info: (msg:string, meta = {}) => baseLogger.info(msg, meta),
    warn: (msg:string, meta = {}) => baseLogger.warn(msg, meta),
    error: (msg:string, meta = {}) => baseLogger.error(msg, meta),
    debug: (msg:string, meta = {}) => baseLogger.debug(msg, meta),
    alert: (msg:string, meta = {}) => baseLogger.log('alert', msg, meta), // nível customizado (precisa configurar abaixo)
};

// Adicionando nível "alert" (opcional)
baseLogger.levels['alert'] = 0;
baseLogger.add(new winston.transports.Console()); // Adiciona log no console também, se quiser

export default logger;
