import * as pdf from "pdf-parse";
import axios  from "axios";

export async function parseFile(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = await pdf(response.data);
    console.log(data.text);
    return data.text;
  } catch (error) {
    console.error('Error parsing file:', error);
    return null;
  }
}
