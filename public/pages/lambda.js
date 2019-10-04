import Head from 'next/head';
const Lambda = ({ value }) => {
  const hasFullICU = () => {
    try {
      const january = new Date(9e8);
      const spanish = new Intl.DateTimeFormat('es', { month: 'long' });
      return spanish.format(january) === 'enero';
    } catch (err) {
      return false;
    }
  };
  console.log('env');
  console.log(JSON.stringify(process.env, null, 2));
  console.log('has full icu', hasFullICU());
  return (
    <>
      <Head>
        <title>Next.js + Lambda page</title>
      </Head>
      <p>this is a lamda because it has a getInitialProps, value : {value}</p>
      <p>hasFullICU: {JSON.stringify(hasFullICU())}</p>
    </>
  );
};
Lambda.getInitialProps = () => {
  if (typeof window === 'undefined') {
    require('full-icu');
  }
  return { value: 42 };
};
export default Lambda;
