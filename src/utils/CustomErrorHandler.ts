class CustomErrorHandler extends Error {
  statusCode: number;
  constructor(status: number, msg: string) {
    super();
    this.statusCode = status;
    this.message = msg;
  }
}
export default CustomErrorHandler;
