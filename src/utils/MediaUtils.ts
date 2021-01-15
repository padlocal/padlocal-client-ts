import { Bytes } from "./ByteUtils";

interface ImageSize {
  width: number;
  height: number;
}

export async function getImageSize(data: Bytes): Promise<ImageSize> {
  const jimp = require("jimp");

  const image = await jimp.read(data);
  return {
    width: image.getWidth(),
    height: image.getHeight(),
  };
}

export async function createImageThumb(data: Bytes, maxWH: number): Promise<Bytes> {
  const jimp = require("jimp");
  const image = await jimp.read(data);

  if (Math.max(image.getWidth(), image.getHeight()) > maxWH) {
    if (image.getWidth() > image.getHeight()) {
      await image.resize(maxWH, jimp.AUTO);
    } else {
      await image.resize(jimp.AUTO, maxWH);
    }
  }

  await image.quality(40);
  return await image.getBufferAsync(jimp.MIME_JPEG);
}

let globalFFMpeg: Function | undefined = undefined;
function getFFMpeg(): Function {
  if (globalFFMpeg === undefined) {
    globalFFMpeg = require("./ffmpeg-mp4.js");
  }
  return globalFFMpeg!;
}

export async function createVideoThumb(data: Bytes, maxWH: number): Promise<Buffer> {
  const ffmpeg = getFFMpeg();

  const result = ffmpeg({
    print: function () {},
    printErr: function () {},
    MEMFS: [{ name: "input.mp4", data }],
    arguments: [
      "-i",
      "input.mp4",
      "-vframes",
      "1",
      "-q:v",
      "10",
      "-filter",
      `scale=min(${maxWH}\\,a*${maxWH}):min(${maxWH}\\,${maxWH}/a)`,
      "output.jpg",
    ],
  });

  const out = result.MEMFS[0];
  return Buffer.from(out.data);
}

export function getVideoDurationSeconds(data: Bytes): number {
  const VideoLib = require("node-video-lib");

  const movie = VideoLib.MovieParser.parse(data);
  return Math.round(movie.relativeDuration());
}
