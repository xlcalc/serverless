export const handler = async (event, context) => {
  const response = await callN9(event);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

    const callN9 = async (event) => {
        const data = JSON.parse(event.body);
        const response = await fetch('https://n9.cl/api/short', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
//          body: event.body
        }).then(response => response.json());
	    return response;
    }
