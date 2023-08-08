import axios from "../../../utils/axios";

export default defineEventHandler(async (event) => {
  if(!event.req.method === 'POST') {
    const err = createError({
      statusCode: 405,
      statusText: 'Method not allowed',
      data: '',
    });
    throw err;
  }

  try {
    const user = await readBody(event);

    const response = await axios.post('/login?project=ecommerce', user);

    return response.data;
  } catch(error) {
    throw createError({
			data: error.response.data,
      statusCode: error.response.status
		});
  }
})