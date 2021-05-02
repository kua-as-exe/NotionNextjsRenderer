// import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType  } from 'next'
import { NotionAPI } from 'notion-client'
import { NotionRenderer } from 'react-notion-x'


export const getServerSideProps: GetServerSideProps<{
  recordMap?: any,
  error?: string
}> = async (context) => {
  const pageId = String(context.params.pageId)

  const api = new NotionAPI()
  
  try{
    const response = await api.getPage(pageId)
    const recordMap = response
    return {
      props: { recordMap }
    }
  }catch( error ){
    return {
      props: { error: String(error) }
    }
  }
}

export default function Home( 
  props: InferGetServerSidePropsType<typeof getServerSideProps> 
) {
  const { recordMap } = props;

  if(recordMap){
    return (
      <>
        <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
        <pre>{JSON.stringify({props}, null, 2)}</pre>
      </>
    )
  } 
  return (<>Page Not Found</>)
}