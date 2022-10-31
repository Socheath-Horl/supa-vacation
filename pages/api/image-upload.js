import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  // upload image to supabase
  if (req.method === 'POST') {
    console.log(req.body);
    let { image } = req.body;
    console.log(image);

    if (!image) {
      return res.status(500).json({ message: 'No image provided'});
    }

    try {

    } catch (e) {
      res.status(500).json({ message: `Something went wrong: ${e}` });
    }

    const contentType = image.match(/data:(.*);base64/)?.[1];
    const base64FileData = image.split('base64,')?.[1];

    if (!contentType || !base64FileData) {
      return res.status(500).json({ message: 'Image data not valid'});
    }

    const fileName = nanoid();
    const ext = contentType.split('/')[1];
    const path = `${fileName}.${ext}`;

    const { data, error: uploadError } = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(path, decode(base64FileData), {
        contentType,
        upsert: true,
      });

      if (uploadError) {
        throw new Error('Unable to upload image to storage');
      }

      // construct public url
      const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
      return res.status(200).json({ url });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.`});
  }
}