export const handler = async (event, context) => {
  //const key = process.env.TEST_KEY;
  //const data = JSON.parse(event.body);
  const response = await callN9(event);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

    const callN9 = async (event) => {
        const data = JSON.parse(event.body);
        const response = await fetch('https://n9.cl/api/short', {
	//const response = await fetch('/.netlify/functions/test', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(response => response.json());
	    return response;
    }
