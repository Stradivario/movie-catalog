import { html, renderToStream } from '@popeindustries/lit-html-server';
import { until } from '@popeindustries/lit-html-server/directives/until';
import { Reader } from '@rhtml/di';
import { Inject, Plugin, PluginInterface } from '@rxdi/core';
import { HAPI_SERVER } from '@rxdi/hapi';
import { Server } from 'hapi';

import { streamVideo } from './stream-video';

export function Body(): Reader<[], any> {
  return () => html`
    ${['Weeds', 'Other Movie'].map(
      v =>
        html`
          <div>${v}</div>
        `,
    )}
  `;
}

export function Layout(): Reader<any, any> {
  return () => html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Movies Catalog</title>
      </head>
      <body>
        ${until(Body()([]))}
      </body>
    </html>
  `;
}

@Plugin()
export class ClientPlugin implements PluginInterface {
  name = 'ClientSideRendering';
  version = '1.0.0';

  constructor(@Inject(HAPI_SERVER) private server: Server) {}

  async register() {
    this.server.route({
      method: 'GET',
      path: '/client',
      handler: this.handler.bind(this),
    });

    this.server.route({
      method: 'GET',
      path: '/video',
      handler: async (request, h) => {
        console.log('AA');

        const video = streamVideo(request.headers);
        return h
          .response(video.file)
          .header('Content-Range', `bytes ${video.start}-${video.end}/${video.fileSize}`)
          .header('Accept-Ranges', 'bytes')
          .header('Content-Length', video.chunksize)
          .header('Content-Type', 'video/mp4');
      },
    });
  }

  async handler(request, h) {
    return h
      .response(renderToStream(Layout()([])))
      .type('text/html')
      .header('Connection', 'keep-alive')
      .header('Cache-Control', 'no-cache');
  }
}
