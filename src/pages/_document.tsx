import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { Loading } from 'components/loading';
import { Babel, Inline } from 'components/repl/required-scripts';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      });

    return await Document.getInitialProps(ctx);
  }

  render() {
    const inReplFrame = this.props.__NEXT_DATA__.page.includes('repl');

    return (
      <Html
        data-theme="unicorn"
        data-loading={!inReplFrame}
        data-repl-frame={inReplFrame}
      >
        <Head>
          <Babel />
          <Inline />
        </Head>

        <body style={{ display: 'block !important' }}>
          {!inReplFrame && <Loading />}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
