export const getDupKeyMongoField = (errorMessage: string) =>
  errorMessage.split('index:')[1].split('dup key')[0].split('_')[0].trim();

export const getDupKeyMongodb = (errMsg: string): Object[] => {
  const errorFormated = errMsg.split(':');

  const errorLength = errorFormated.length;

  const field = errorFormated[errorLength - 2].replace(/{/g, '').trim();

  const value = errorFormated[errorLength - 1].replace(/}|"/g, '').trim();

  return [{ [field]: value }];
};
