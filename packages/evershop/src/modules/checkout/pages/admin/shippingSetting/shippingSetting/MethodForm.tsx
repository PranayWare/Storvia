// MethodForm.tsx
import { Card } from '@components/admin/Card.js';
import Spinner from '@components/admin/Spinner.js';
import Button from '@components/common/Button.js';
import { Form, useFormContext } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { ReactSelectField } from '@components/common/form/ReactSelectField.js';
import React from 'react';
import { ShippingMethod } from './Method.tsx';

export interface MethodFormProps {
  formMethod?: 'POST' | 'PATCH';
  saveMethodApi: string;
  onSuccess: () => void;
  reload: () => void;
  method?: ShippingMethod;
}

export function MethodForm({
  formMethod,
  saveMethodApi,
  onSuccess,
  reload,
  method
}: MethodFormProps) {
  const { watch } = useFormContext();

  const calculationOptions = [
    { value: 'fixed', label: 'Fixed' },
    { value: 'percentage', label: 'Percentage' }
  ];

  return (
    <Card title="Create Shipping Method">
      <Form
        id="createShippingMethod"
        method={formMethod || 'POST'}
        action={saveMethodApi} // action is required
        submitBtn={false}
        onSuccess={async () => {
          await reload();
          onSuccess();
        }}
      >
        <Card.Session title="Method name">
          <InputField
            name="name"
            placeholder="Enter method name"
            required
            validation={{ required: 'Method name is required' }}
            value={method?.name ?? ''}
          />
        </Card.Session>

        <Card.Session title="Calculation Type">
          <ReactSelectField
            name="calculation_type"
            options={calculationOptions}
            isMulti={false}
            hideSelectedOptions={false}
            aria-label="Select calculation type"
            defaultValue={null}
          />
        </Card.Session>

        <Card.Session title="Cost">
          <InputField
            name="cost"
            type="number"
            placeholder="Enter shipping cost"
            required
            validation={{ required: 'Cost is required' }}
            value={method?.cost?.value ?? ''}
          />
        </Card.Session>

        <Card.Session>
          <div className="flex justify-end gap-2">
            <Button
              title="Save"
              variant="primary"
              onAction={() => {
                const form = document.getElementById(
                  'createShippingMethod'
                ) as HTMLFormElement | null;
                if (form) {
                  form.dispatchEvent(
                    new Event('submit', {
                      cancelable: true,
                      bubbles: true
                    })
                  );
                }
              }}
            />
          </div>
        </Card.Session>
      </Form>
    </Card>
  );
}
