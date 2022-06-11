import * as randomstring from 'randomstring';

const StringGeneratorService = {
  async generate(
    /*eslint-disable */
    exists: (code: string) => Promise<boolean>,
    options?: number | randomstring.GenerateOptions,
    attempts = 3,

  ): Promise<string | undefined> {
    let count = 0;
    let code: string | undefined;

    do {
      code = randomstring.generate(options);

      if (await exists(code)) {
        code = undefined;
      }
    } while (count++ < attempts && code === undefined);

    return code;
  }
};

export default StringGeneratorService;
