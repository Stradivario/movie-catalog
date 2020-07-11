import { createReadStream, statSync } from 'fs';

export function streamVideo(headers) {
  const path = 'assets/sample.mp4';
  const stat = statSync(path);
  const fileSize = stat.size;
  const range = headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = String(end - start + 1);
    const file = createReadStream(path, { start, end });

    return { file, start, end, fileSize, chunksize };
  }
}
