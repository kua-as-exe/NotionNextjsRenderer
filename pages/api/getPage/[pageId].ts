// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NotionAPI } from 'notion-client'
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res:NextApiResponse) => {

  console.log(req.query);
  const pageId = req.query.pageId as string;

  // you can optionally pass an authToken to access private notion resources
  const api = new NotionAPI()
  
  // fetch a page's content, including all async blocks, collection queries, and signed urls
  api.getPage(pageId).then( page => {
    res.status(200).json(page)
  }).catch( (err: Error) => {
    res.status(400).json({error: String(err)})
  })
  
}
