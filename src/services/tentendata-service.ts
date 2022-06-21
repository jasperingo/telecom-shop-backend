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

  async getAccountBalance() {
    const response = await this.call('user/', 'GET');

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const data = await response.json() as any;

    return data.user.Account_Balance as number;
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
  },

  async buyAirtime(network: number, mobile_number: string, amount: number, airtime_type = 'VTU') {
    const response = await this.call('topup/', 'POST', {
      amount,
      network,
      mobile_number,
      airtime_type,
      Ported_number: true
    });

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    return response.json();
  },

  async buyElectricity(disco_name: number, meter_number: string, amount: number, MeterType: string) {
    const response = await this.call('billpayment/', 'POST', {
      amount,
      disco_name,
      meter_number,
      MeterType,
    });

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    return response.json();
  },

  async buyCableSubscription(cablename: number, cableplan: number, smart_card_number: string) {
    const response = await this.call('cablesub/', 'POST', {
      cablename,
      cableplan,
      smart_card_number,
    });

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    return response.json();
  },
};

export default TentendataService;
