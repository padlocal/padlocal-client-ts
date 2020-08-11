export namespace log {
    export enum LogLevel {
        DEBUG = 0,
        INFO,
        WARN,
        ERROR,
    }

    let _logger: Partial<Console> = console;
    let _logLevel: LogLevel = LogLevel.INFO;

    export const getLogger = (): Partial<Console> => {
        return _logger;
    };

    export const setLogger = (logger: Partial<Console>): void => {
        _logger = logger;
    };

    export const setLogLevel = (logLevel: LogLevel): void => {
        _logLevel = logLevel;
    };

    export const log = (logLevel: LogLevel, ...args: any[]): void => {
        if (logLevel < _logLevel) {
            return;
        }
        switch (logLevel) {
            case LogLevel.DEBUG:
                if (_logger && typeof _logger.debug === 'function') {
                    _logger.debug(...args);
                }
                break;
            case LogLevel.INFO:
                if (_logger && typeof _logger.info === 'function') {
                    _logger.info(...args);
                }
                break;
            case LogLevel.WARN:
                if (_logger && typeof _logger.warn === 'function') {
                    _logger.warn(...args);
                }
                break;
            case LogLevel.ERROR:
                if (_logger && typeof _logger.error === 'function') {
                    _logger.error(...args);
                }
                break;
        }
    }

    export const debug = (...args: any[]): void => {
        log(LogLevel.DEBUG, ...args);
    }

    export const info = (...args: any[]): void => {
        log(LogLevel.INFO, ...args);
    }

    export const warn = (...args: any[]): void => {
        log(LogLevel.WARN, ...args);
    }

    export const error = (...args: any[]): void => {
        log(LogLevel.ERROR, ...args);
    }
}


