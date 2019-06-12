import {rm} from 'shelljs';

export async function cleanDist() {
  rm("-rf", "dist");
}