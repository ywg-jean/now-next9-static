import Head from 'next/head';

const Lambda = ({value})=>
(<>
  <Head><title>Next.js + Lambda page</title></Head>
  <p>this is a lamda because it has a getInitialProps, value : {value}</p>
</>)

Lambda.getInitialProps = ()=>{return {value:42};}
export default Lambda;