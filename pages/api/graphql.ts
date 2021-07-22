import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const response = await axios.post(`http://shopad-toptop-api.shopadbox-test.svc.ad1.io.navercorp.com/graphql`, req.body).then((r) => r.data)
  res.status(StatusCodes.OK).json(response)
}

export default handler
