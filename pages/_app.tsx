// pages/_app.js
import React from 'react'
import App from 'next/app';
import wrapper from "../store";

// For default you don't need to edit _app.tsx, but if you want to wrapper the pages with redux wrapper, you need
// to override _app.tsx with this code bellow
class MyApp extends App {
    // @ts-ignore
    static async getInitialProps({Component, ctx}) {
        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            }
        };
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Component {...pageProps} />
        );
    }

}

export default wrapper.withRedux(MyApp);
