declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: 'development' | 'production';
    API_URL?: string;
  }
}
