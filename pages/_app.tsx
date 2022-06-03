import '../styles/globals.css'
import "antd/dist/antd.min.css";
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import Store from "../redux/store";
import { parseCookies, destroyCookie } from "nookies";
const cookies = parseCookies();
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>)
}



MyApp.getInitialProps = async (appContext: any) => {
  const { ctx, router } = appContext;
  const cookies = parseCookies(ctx);
  if (cookies?.token) {
    if (!router.route.startsWith("/dashboard")) {
      ctx.res.writeHead(302, { Location: '/dashboard' });
      ctx.res.end();
    }
  }
  else{
    if (router.route.startsWith("/dashboard")) {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    }
  }
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}

export default MyApp;