import axios from 'axios';
import validator from 'validator';
import { getToken } from '@hooks/token';
import getBaseURL from '@hooks/urls';

// Função auxiliar para requisições POST
async function postData(endpoint, data, token = null) {
  const BASE_URL = await getBaseURL();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const res = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
    return res.data;
  } catch (error) {
    console.log(error.request);
    let errMsg;

    if (error.response) {
      const err = error.response.data;
      errMsg = err?.message || 'Erro inesperado no servidor';
    } else if (error.request) {
      // A solicitação foi feita, mas não houve resposta
      errMsg = 'Sem resposta do servidor. Verifique sua conexão.';
    } else {
      errMsg = error.message;
    }

    throw new Error(errMsg);
  }
}

async function getData(endpoint, data,) {
  const BASE_URL = await getBaseURL();
  const token = await getToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, data, { headers });
    return res.data;
  } catch (error) {
    let errMsg;

    if (error.response) {
      const err = error.response.data;
      errMsg = err?.message || 'Erro inesperado no servidor';
    } else if (error.request) {
      // A solicitação foi feita, mas não houve resposta
      errMsg = 'Sem resposta do servidor. Verifique sua conexão.';
    } else {
      errMsg = error.message;
    }

    throw new Error(errMsg);
  }
}

// Login do usuário
export const loginUser = async (email, password) => {
  const sanitizedEmail = validator.normalizeEmail(email);
  const sanitizedPassword = validator.escape(password);

  return await postData('/auth', {
    email: sanitizedEmail,
    password: sanitizedPassword,
  });
}


// Registro do usuário
export const registerUser = async (params) => {
  const sanitizedParams = {
    email: validator.normalizeEmail(params.email),
    password: validator.escape(params.password),
    name: validator.escape(params.name),
    cpf: validator.escape(params.cpf),
    whatsapp: validator.escape(params.tel),
  };

  return await postData('/usuarios/register', sanitizedParams);
};

// Redefinir senha - envio de email
export const resetPassword = async (email) => {
  const sanitizedEmail = validator.normalizeEmail(email);
  return await postData('/usuarios/esquecisenhaemail', { email: sanitizedEmail });
};

// Redefinir senha - envio de código
export const resetPasswordCode = async (email, code) => {
  const sanitizedEmail = validator.normalizeEmail(email);
  return await postData('/usuarios/esquecisenhacodigo', {
    email: sanitizedEmail,
    codigo: code,
  });
};

// Redefinir senha - nova senha
export const resetPasswordNew = async (params) => {
  return await postData('/usuarios/esquecisenharedefinir', {
    email: params.email,
    codigo: params.codigo,
    password: params.password,
    password_confirmation: params.password_confirmation,
  });
};

// Validação de token
export const validateToken = async (token) => {
  const sanitizedToken = validator.escape(token);
  return await postData('/token', { token: sanitizedToken });
};

// Atualizar perfil de usuário
export const updateUser = async (params) => {
  const token = await getToken();
  return await postData('/usuarios/editarperfil', {
    name: params.name,
    whatsapp: params.whatsapp,
    avatar: params.avatar,
  }, token);
};

// Listar informações do usuário
export const listUser = async () => {
  const token = await getToken();
  return await getData('/usuarios/user', token);
};

// Verificar email com código
export const verifyEmail = async (email, code) => {
  const sanitizedEmail = validator.normalizeEmail(email);
  return await postData('/usuarios/validacodigo', {
    email: sanitizedEmail,
    codigo: code,
  });
};

// Exclusão de usuário
export const excludeUser = async (password, message) => {
  const token = await getToken();
  return await postData('/usuarios/exclusao', { password, message }, token);
};

