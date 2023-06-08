export const handler = async (event, context) => {
  const key = process.env.TEST_KEY;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World! ' + key,
    }),
  }
}
