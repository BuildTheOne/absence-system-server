import { Module } from './Module';

const auth: Module = {
  name: 'Auth',
  url: '/auth',
};

const signIn: Module = {
  name: 'Sign In',
  url: '/sign-in',
  label: 'module.auth.sign_in.title',
  desc: 'module.auth.sign_in.description',
};

const signOut: Module = {
  name: 'Sign Out',
  url: '/sign-out',
  label: 'module.auth.sign_out.title',
  desc: 'module.auth.sign_out.description',
};

const signOutAll: Module = {
  name: 'Sign Out All',
  url: '/sign-out-all',
  label: 'module.auth.sign_out_all.title',
  desc: 'module.auth.sign_out_all.description',
};

const signUp: Module = {
  name: 'Sign Up',
  url: '/sign-up',
  label: 'module.auth.sign_up.title',
  desc: 'module.auth.sign_up.description',
};

export const AuthModule = {
  auth: auth,
  sign_in: signIn,
  sign_out: signOut,
  sign_out_all: signOutAll,
  sign_up: signUp,
};
