import fetch from 'node-fetch-commonjs';

const TentendataService = {
  call(path: string, method: 'POST' | 'GET', body?: any) {
    return fetch(`${process.env.TENTENDATA_API_PATH}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.TENTENDATA_API_KEY}`,
      },
      body: body !== undefined ? JSON.stringify(body) : body,
    });
  },

  async buyData(network: number, mobile_number: string, plan: number) {
    const response = await this.call('data/', 'POST', {
      plan,
      network,
      mobile_number,
      Ported_number: true
    });

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    return response.json();
  }
};

export default TentendataService;
