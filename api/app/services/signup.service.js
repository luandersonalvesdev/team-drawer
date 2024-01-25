const { PrismaClient } = require('@prisma/client');
const signupSchema = require('../validations/signupSchema.joi');
const { generateToken } = require('../auth/authToken');
const {
  httpResponseMapper, SUCCESS, BAD_REQUEST, CONFLICT,
} = require('../utils/httpResponseMapper');

const prisma = new PrismaClient();

const doSignup = async (email, username, password) => {
  const { error } = signupSchema.validate({ email, username, password });
  if (error) {
    return {
      status: httpResponseMapper[BAD_REQUEST],
      data: {
        error: 'Validation error',
        message: error.message,
      },
    };
  }

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email },
      ],
    },
  });

  if (userExists) {
    return {
      status: httpResponseMapper[CONFLICT],
      data: {
        error: 'Conflict',
        message: 'Username or email already registered',
      },
    };
  }

  const user = await prisma.user.create({
    data: { email, username, password },
  });

  delete user.email;
  delete user.password;

  const token = generateToken({ user });

  return {
    status: httpResponseMapper[SUCCESS],
    data: { ...user, token },
  };
};

module.exports = {
  doSignup,
};
