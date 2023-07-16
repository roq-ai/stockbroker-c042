import * as yup from 'yup';

export const investmentValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  brokerage_id: yup.string().nullable(),
});
