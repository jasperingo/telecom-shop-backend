declare namespace Express {
  export interface Request {
    data: {
      user: import('./models/User').default,
      product: import('./models/Product').default,
      brand: import('./models/Brand').default,
      photo: import('./models/Photo').default,
      productUnit: import('./models/ProductUnit').default,
      transaction: import('./models/Transaction').default,
    };
  }
}
