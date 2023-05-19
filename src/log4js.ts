import console from "node:console";
import config from "./configs/index";

export default () => {
  (() => {
    if (process.env.NODE_ENV === "test") return;
    const log4js = require("log4js");
    const configuration = config.LOG4JS.config;
    console.log("Init DAKLogger");
    log4js.configure(configuration);
    const logger = log4js.getLogger();
    // console.log = (message, ...optionalParams: any[]) => { logger.log(message, ...optionalParams) }
    console.info = (message: any, ...optionalParams: any[]) => {
      logger.info(message, ...optionalParams);
    };
    console.warn = (message: any, ...optionalParams: any[]) => {
      logger.warn(message, ...optionalParams);
    };
    console.debug = (message: any, ...optionalParams: any[]) => {
      logger.debug(message, ...optionalParams);
    };
    console.error = (message: any, ...optionalParams: any[]) => {
      logger.error(message, ...optionalParams);
    };

    process.on("exit", () => {
      console.log("exit log file");
      log4js.shutdown();
    });
    return true;
  })();
};
