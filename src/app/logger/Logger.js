export class Logger {
  constructor(logger) {
    this.logger = logger;
  }

  info() {
    this.logger.info(...arguments)
  }

  log() {
    this.logger.log(...arguments)
  }

  warn() {
    this.logger.warn(...arguments)
  }

  error() {
    this.logger.error(...arguments)
  }

  infoCreated(obj) {
    info({ status: 201, data: obj });
  }

  infoSucces(obj) {
    info({ status: 200, data: obj });
  }

  infoNoContent() {
    info({ status: 204 });
  }

  warnBadRequest(message) {
    warn({ status: 400, data: message })
  }

}