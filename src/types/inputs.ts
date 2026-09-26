import type {
  AccountDetailsSchemaType,
  CategorySchemaType,
  DeliveryRegisterSchemaType,
  ExtraSchemaType,
  ForgotSchemeType,
  LoginSchemeType,
  OrderSchemaType,
  ProductSchemaInput,
  ProductSchemaUpdateInput,
  RegisterSchemeType,
  ResetSchemeType,
  SizeSchemaType,
  UpdatePasswordSchemaType,
} from '@/validation';

export type LoginFieldName = keyof LoginSchemeType;
export type RegisterFieldName = keyof RegisterSchemeType;
export type ForgotFieldName = keyof ForgotSchemeType;
export type ResetFieldName = keyof ResetSchemeType;

export type AccountDetailsFieldName = keyof AccountDetailsSchemaType;
export type UpdatePasswordFieldName = keyof UpdatePasswordSchemaType;

export type ExtraFieldName = keyof ExtraSchemaType;
export type SizeFieldName = keyof SizeSchemaType;
export type CategoryFieldName = keyof CategorySchemaType;

export type ProductFieldName = keyof ProductSchemaInput;
export type ProductUpdateFieldName = keyof ProductSchemaUpdateInput;

export type OrderFieldName = keyof OrderSchemaType;

export type DeliveryRegisterFieldName = keyof DeliveryRegisterSchemaType;
