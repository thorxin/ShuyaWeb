import { GET_STORED_ACCESS_TOKEN } from "../util/storage";

const BEARER = `Bearer ${GET_STORED_ACCESS_TOKEN}`;

/**
 * Open Api(No Authorization - No JWT Token)
 */
const OPEN_GET_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};
const OPEN_POST_CONFIG = (body = {}) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json-patch+json",
  },
  body,
});

const OPEN_POST_CONFIG_MULTIPART_FORM = (body = {}) => ({
  method: "POST",
  headers: {},
  body,
});

const POST_CONFIG_ORDER_ACTIVTY = {
  method: "POST",
  headers: {
    Authorization: BEARER,
  },
};

/**
 * Close Api(require Authorization - require JWT Token)
 */
const GET_CONFIG = {
  headers: {
    Authorization: BEARER,
  },
};
const DELETE_CONFIG = {
  method: "DELETE",
  headers: {
    Authorization: BEARER,
  },
};
const GET_CONFIG_WITH_TOKEN = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const POST_CONFIG = (body = {}) => ({
  method: "POST",
  headers: {
    Authorization: BEARER,
    "Content-Type": "application/json-patch+json",
  },
  body,
});

const PUT_CONFIG = (body = {}) => ({
  method: "PUT",
  headers: {
    Authorization: BEARER,
    "Content-Type": "application/json-patch+json",
  },
  body,
});

const POST_CONFIG_MULTIPART_FORM = (body = {}) => ({
  method: "POST",
  headers: {
    Authorization: BEARER,
  },
  body,
});

const POST_CONFIG_WITH_TOKEN = (body, token) => ({
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json-patch+json",
  },
  body,
});

const POST_CONFIG_WITH_TOKEN_ID = (body, token) => ({
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body,
});


const POST_CONFIG_ = (body = {}, temp_bearer = "") => ({
  method: "POST",
  headers: {
    Authorization: temp_bearer ? temp_bearer : BEARER,
    "Content-Type": "application/json-patch+json",
  },
  body,
});

export {
  BEARER,
  OPEN_GET_CONFIG,
  OPEN_POST_CONFIG,
  OPEN_POST_CONFIG_MULTIPART_FORM,
  GET_CONFIG,
  GET_CONFIG_WITH_TOKEN,
  POST_CONFIG_WITH_TOKEN_ID,
  POST_CONFIG,
  PUT_CONFIG,
  POST_CONFIG_MULTIPART_FORM,
  POST_CONFIG_WITH_TOKEN,
  POST_CONFIG_,
  POST_CONFIG_ORDER_ACTIVTY,
  DELETE_CONFIG
};
