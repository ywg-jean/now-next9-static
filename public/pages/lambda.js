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
      dirents.forEach(dirent => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : console.log(res);
      });
    }
    console.log('PWD', process.env['PWD']);
    console.log('LAMBDA_HOME', process.env['PWD']);

    await getFiles(path.join(process.env['PWD'], 'node_modules', 'full-icu'));
    try {
      fs.readFileSync(
        path.join(__dirname, 'node_modules', 'full-icu', 'icudt60l.dat')
      );
      fs.readFileSync(
        path.join(__dirname, 'node_modules', 'full-icu', 'icudt64l.dat')
      );
      fs.readFileSync(
        path.join(__dirname, 'node_modules', 'full-icu', 'icudt62l.dat')
      );
      fs.readFileSync(
        path.join(__dirname, 'node_modules', 'full-icu', 'package.json')
      );
      fs.readFileSync(
        path.join(__dirname, 'node_modules', 'full-icu', 'full-icu.jj')
      );
      fs.readFileSync(
        path.join(
          __dirname,
          'node_modules',
          'full-icu',
          'node_modules',
          'icu4c-data',
          'icu-config.json'
        )
      );
      fs.readFileSync(
        path.join(
          __dirname,
          'node_modules',
          'full-icu',
          'node_modules',
          'icu4c-data',
          'icudt64l.dat'
        )
      );
      fs.readFileSync(
        path.join(__dirname, '..', 'node_modules', 'full-icu', 'icudt64l.dat')
      );
      fs.readFileSync(
        path.join(__dirname, '..', 'node_modules', 'full-icu', 'icudt62l.dat')
      );
      fs.readFileSync(
        path.join(__dirname, '..', 'node_modules', 'full-icu', 'package.json')
      );
      fs.readFileSync(
        path.join(__dirname, '..', 'node_modules', 'full-icu', 'full-icu.jj')
      );
      fs.readFileSync(
        path.join(
          __dirname,
          '..',
          'node_modules',
          'full-icu',
          'node_modules',
          'icu4c-data',
          'icu-config.json'
        )
      );
      fs.readFileSync(
        path.join(
          __dirname,
          '..',
          'node_modules',
          'full-icu',
          'node_modules',
          'icu4c-data',
          'icudt64l.dat'
        )
      );
    } catch (error) {}
  }
  console.log('env');
  console.log(JSON.stringify(process.env, null, 2));
  return { value: 42 };
};
export default Lambda;
