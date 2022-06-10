declare namespace Express {
  export interface Request {
    data: {
      user: import('./models/User').default
    };
  }
}
