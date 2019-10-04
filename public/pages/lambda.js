import Head from 'next/head';
import fs from 'fs';
import path from 'path';
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
Lambda.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    require('full-icu');
    async function getFiles(dir) {
      const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
      const files = dirents.map(dirent => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory()
          ? Promise.resolve(res + '/')
          : Promise.resolve(res);
      });
      const arr = await Promise.all(files);
      return Array.prototype.concat(...arr);
    }

    //const files = await getFiles(__filename);
    //files.forEach(file => console.log(file));
    try {
      fs.readFileSync(path.join(__dirname, 'full-icu', 'somefile.data'));
    } catch (error) {}
  }
  console.log('env');
  console.log(JSON.stringify(process.env, null, 2));
  return { value: 42 };
};
export default Lambda;
