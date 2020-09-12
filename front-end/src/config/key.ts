import dev from './dev';
import prod from './prod';

export type config = {
  apiServerUrl: string;
}

const key: config = process.env.NODE_ENV === 'production' ? prod : dev;

export default key;