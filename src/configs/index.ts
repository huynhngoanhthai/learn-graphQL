import { config } from "dotenv";
const envFound = config();
if (envFound.error)
  // This error should crash whole process
  throw new Error("Couldn't find .env file");

export default {
  LOG4JS: {
    config: {
      appenders: {
        console: {
          type: "console",
          layout: {
            pattern: "%[[%p]%] %m",
            type: "pattern",
          },
        },
        "console-trace": {
          type: "console",
          layout: {
            pattern: "%[[%p]%] %m%n%s",
            type: "pattern",
          },
        },
        main: {
          type: "dateFile",
          filename: `${process.env.LOG_DIR}/main/dak-api.log`,
          layout: {
            type: "pattern",
            pattern: "%d{dd/MM/yyyy-hh:mm:ss} [%p] %m",
          },
          pattern: ".dd-MM-yyyy",
          keepFileExt: true,
          compress: false,
          numBackups: 30,
        },
        error: {
          type: "dateFile",
          filename: `${process.env.LOG_DIR}/error/dak_api_error.log`,
          layout: {
            type: "pattern",
            pattern: "%d{dd/MM/yyyy-hh:mm:ss} [%p] %m%n%s",
          },
          pattern: ".dd-MM-yyyy",
          keepFileExt: true,
          compress: false,
          numBackups: 30,
        },
        ConsoleFilter_default: {
          type: "logLevelFilter",
          appender: "console",
          level: "TRACE",
          maxLevel: "WARN",
        },
        ConsoleFilter_error: {
          type: "logLevelFilter",
          appender: "console-trace",
          level: "ERROR",
        },

        FileFilter_main: {
          type: "logLevelFilter",
          appender: "main",
          level: "TRACE",
        },
        FileFilter_error: {
          type: "logLevelFilter",
          appender: "error",
          level: "ERROR",
        },
      },
      categories: {
        default: {
          appenders: [
            "ConsoleFilter_default",
            "ConsoleFilter_error",
            "FileFilter_main",
            "FileFilter_error",
          ],
          enableCallStack: true,
          // Level
          // 1. trace
          // 2. debug
          // 3. info
          // 4. warn
          // 5. error
          // 6. fatal
          //
          // If category’s level is less than or equal to the event’s level,
          // it will be sent to the category’s appender(s).
          //
          // Nếu 'level' của 'category' thấp hơn hoặc bằng với 'level' do 'event' tạo ra,
          // log sẽ được viết vào file hay console
          //
          // Example: `trace` > `info`
          // If level: `info`
          // Then logger.trace() will be skip
          // Then logger.debug() will be skip
          // Then logger.info() will be displayed on console and writed into file
          // Then logger.warn() will be displayed on console and writed into file

          // Ví dụ: `trace` > `info`
          // Nếu level: `info`
          // Thì logger.trace() sẽ bị bỏ qua
          // Thì logger.debug() sẽ bị bỏ qua
          // Thì logger.info() sẽ hiện thị trong console và ghi vào file
          // Thì logger.warn() sẽ hiện thị trong console và ghi vào file
          level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info",
        },
      },
    },
    LOG_LEVEL: process.env.LOG_LEVEL,
    LOG_DIR: process.env.LOG_DIR,
  },

  NEO4J: {
    // host
    NEO4J_HOST: process.env.NEO4J_HOST || "213",
    NEO4J_USERNAME: process.env.NEO4J_USERNAME || "213",
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD || "213",
    NEO4J_DATABASE: process.env.NEO4J_DATABASE || "213",
    disableLosslessIntegers: true,
    maxConnectionPoolSize: 1000,
  },
};
