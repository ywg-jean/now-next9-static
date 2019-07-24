import Head from 'next/head';

const Static = ({value})=>
(<>
  <Head><title>Next.js + static page</title></Head>
  <p>this is a static page because it has no getInitialProps</p>
</>)

export default Static;