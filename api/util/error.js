// export const errorHandler=(statusCode,message)=>{
//     const error=new error();
//     error.statusCode=statusCode;
//     error.message=message;
//     return error;
// };
export const errorHandler = (statusCode, message) => {
    const error = new Error(message); // Use 'Error' instead of 'error'
    error.statusCode = statusCode;
    return error;
};
