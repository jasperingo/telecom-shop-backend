import jwt from 'jsonwebtoken';

type JWTPayload = { id: number };

const JWTService = {
  
  sign(payload: JWTPayload) {
    return new Promise<string | undefined>((resolve, reject)=> {
      jwt.sign(
        payload, 
        process.env.JWT_SECRET as jwt.Secret, 
        { expiresIn: process.env.JWT_DURATION }, 
        (err, token)=> {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  },

  verify(token: string) {
    return new Promise<JWTPayload>((resolve, reject)=> {
      jwt.verify(
        token, 
        process.env.JWT_SECRET as jwt.Secret, 
        (err, decoded)=> {
          if (err) reject(err);
          else resolve(decoded as JWTPayload);
        }
      );
    });
  }
};

export default JWTService;
