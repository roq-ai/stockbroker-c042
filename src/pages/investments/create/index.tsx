import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createInvestment } from 'apiSdk/investments';
import { Error } from 'components/error';
import { investmentValidationSchema } from 'validationSchema/investments';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { BrokerageInterface } from 'interfaces/brokerage';
import { getUsers } from 'apiSdk/users';
import { getBrokerages } from 'apiSdk/brokerages';
import { InvestmentInterface } from 'interfaces/investment';

function InvestmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InvestmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInvestment(values);
      resetForm();
      router.push('/investments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InvestmentInterface>({
    initialValues: {
      amount: 0,
      user_id: (router.query.user_id as string) ?? null,
      brokerage_id: (router.query.brokerage_id as string) ?? null,
    },
    validationSchema: investmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Investment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="amount" mb="4" isInvalid={!!formik.errors?.amount}>
            <FormLabel>Amount</FormLabel>
            <NumberInput
              name="amount"
              value={formik.values?.amount}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.amount && <FormErrorMessage>{formik.errors?.amount}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<BrokerageInterface>
            formik={formik}
            name={'brokerage_id'}
            label={'Select Brokerage'}
            placeholder={'Select Brokerage'}
            fetcher={getBrokerages}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'investment',
    operation: AccessOperationEnum.CREATE,
  }),
)(InvestmentCreatePage);
