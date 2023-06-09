export const handler = async (event, context) => {
  //const key = process.env.TEST_KEY;
  const data = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(data), //echo data
  }
}

