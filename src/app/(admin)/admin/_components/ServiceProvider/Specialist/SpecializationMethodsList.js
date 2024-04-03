import { CheckboxGroupInput, ReferenceArrayInput } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES, PSYCHOLOGIST } from '@admin/_lib/consts';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa';
import { useSpecializationsWithMethods } from '@admin/components/ServiceProvider/hooks/useSpecializationsWithMethods';

export function SpecializationMethodsList({ specializationsIdList, type, className }) {
  const { specializationsWithMethodsList } = useSpecializationsWithMethods({ specializationsIdList });

  return (
    <ul className={className}>
      {specializationsWithMethodsList?.map(specialization => {
        const label = specialization.name.toLowerCase();
        const name =
          specialization.name.toLowerCase() === PSYCHOLOGIST.toLowerCase() ? 'psychologist' : 'psychotherapist';

        return (
          <li key={specialization.id} className="mb-6">
            <Accordion>
              <AccordionSummary expandIcon={<FaAngleDown />}>Методи і напрямки для {label}a</AccordionSummary>
              <AccordionDetails>
                {type === 'create' ? (
                  <CheckboxGroupInput
                    source="specializationMethods"
                    name="specializationMethods"
                    optionText="name"
                    choices={specialization.specializationMethods}
                    row={false}
                    label={false}
                  />
                ) : (
                  <ReferenceArrayInput
                    source={`specializationMethodsIds[${name}]`}
                    reference="Method"
                    filter={{ specializationId: specialization.id }}
                    perPage={100}
                  >
                    <CheckboxGroupInput
                      optionText="title"
                      name={`specializationMethodsIds[${name}]`}
                      row={false}
                      label={false}
                    />
                  </ReferenceArrayInput>
                )}
              </AccordionDetails>
            </Accordion>
          </li>
        );
      })}
    </ul>
  );
}

SpecializationMethodsList.propTypes = {
  specializationsIdList: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  className: PropTypes.string,
};
