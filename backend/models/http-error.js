// class HttpError extends Error {
// 	constructor(message, errorCode) {
// 		super(message);
// 		this.code = errorCode;
// 	}
// }

const HttpError = (message, status) => {
	return { message, code: status };
};

module.exports = HttpError;
