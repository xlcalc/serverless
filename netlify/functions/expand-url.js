export const handler = async (event, context) => {
  const response = event.body; // echo
//  const response = await fetch("https://n9.cl/dsao0").then(response => response.json());
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}