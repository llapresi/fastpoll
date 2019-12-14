// make Fetch actually throw error on 4xx status
// based on https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

function handleErrors(response) {
  if (!response.ok) {
    return response.text().then((text) => {throw new Error(text)});
  }
  return response;
}

export default handleErrors;