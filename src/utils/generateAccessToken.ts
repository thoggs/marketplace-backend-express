import jwt from 'jsonwebtoken';

const generateAccessToken = (user: any) => {
  const payload = { id: user.id, email: user.email };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  });
};

export default generateAccessToken;
