async function fetchGraphQL(text: string, variables): Promise<any> {
  const response = await fetch('https://hackatalk.azurewebsites.net/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

export default fetchGraphQL;
