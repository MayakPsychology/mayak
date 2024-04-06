'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { ProfileImage } from '@components/CardSpecialist/ProfileImage';
import { AddressesList } from '@components/CardSpecialist/AddressesList';
import { BadgeList } from '@components/CardSpecialist/BadgeList';
import { CardButton } from '@components/CardSpecialist/CardButton';
import { CardWrapper } from '@components/CardSpecialist/CardWrapper';
import { ContactsList } from '@components/CardSpecialist/ContactsList';
import { DetailsList } from '@components/CardSpecialist/DetailsList';
import { SocialsList } from '@components/CardSpecialist/SocialsList';
import { SpecialistTitle } from '@components/CardSpecialist/SpecialistTitle';
import { SpecializationsPanel } from '@components/CardSpecialist/SpecializationsPanel';
import { getContactsList, getLabelsList, getSpecialistSocials } from '@components/CardSpecialist/config';
import { specialistPropType } from '@components/CardSpecialist/prop-types';
import { ClientCategoryList } from '../ClientCategoryList';
import { WorkTime } from '../WorkTime';
import { SpecialistChipLists } from './SpecialistChipLists';

export function CardSpecialist({ specialist, className, extended = false }) {
  if (!specialist) throw new Error('Specialist is not found');

  const {
    id,
    gender,
    firstName,
    lastName,
    surname,
    specializations,
    specializationMethods,
    yearsOfExperience,
    isFreeReception,
    formatOfWork,
    addresses,
    supportFocuses,
    workTime,
    phone,
    email,
    website,
    description,
    instagram,
    facebook,
    tiktok,
    youtube,
    linkedin,
    viber,
    telegram,
    clientsNotWorkingWith,
    clientsWorkingWith,
  } = specialist;

  const specializationsList = specializations.map(s => s.name);
  addresses.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  const addressPrimary = addresses[0];
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({ yearsOfExperience, isFreeReception, formatOfWork, specialistType: 'specialist' });
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });
  const name = surname ? `${lastName} ${firstName} ${surname}` : `${lastName} ${firstName}`;

  const workTimeElement = !!workTime?.length && <WorkTime workTime={workTime} />;

  return (
    <CardWrapper className={className} id={id} type="specialist">
      <div className="hidden max-w-[150px] md:block lg:max-w-[200px]">
        <ProfileImage gender={gender} className="relative sm:w-[70px] md:max-w-[200px] lg:w-[200px]">
          <SocialsList socials={socials} className="absolute bottom-4" />
        </ProfileImage>
        <ContactsList truncate={!extended} specialistId={id} contacts={contactsList} className="mt-4" />
        {workTimeElement}
      </div>
      <div className="flex w-[100%] max-w-full flex-col gap-4 overflow-hidden md:ml-4">
        <header className="relative flex flex-row gap-2.5">
          <ProfileImage gender={gender} className="md:hidden">
            <SocialsList socials={socials} className="absolute bottom-4 hidden md:inline-block" />
          </ProfileImage>
          <div className="max-w-full overflow-hidden">
            <SpecializationsPanel
              specialistId={id}
              specializations={specializationsList}
              extendedCardOpened={extended}
            />
            <SpecialistTitle id={id} truncate={!extended} name={name} className="mt-1.5" />
          </div>
        </header>
        <BadgeList labels={labelsList} />
        <SpecialistChipLists
          id={id}
          specializationMethods={specializationMethods}
          specializationsList={specializationsList}
          className="border-t border-dashed border-t-gray-200 pt-4"
        />
        {extended ? (
          <>
            <ClientCategoryList id={id} isWorkWith clientCategories={clientsWorkingWith} />
            <ClientCategoryList id={id} isWorkWith={false} clientCategories={clientsNotWorkingWith} />
            <DetailsList
              className="border-t border-dashed border-t-gray-200 pt-4"
              details={{ addresses, description, supportFocuses }}
              text="спеціаліста"
              clientsWorkingWith={clientsWorkingWith}
              clientsNotWorkingWith={clientsNotWorkingWith}
            />
            <ContactsList
              truncate={!extended}
              specialistId={id}
              contacts={contactsList}
              className="border-t border-dashed border-t-gray-200 pt-3 md:hidden"
            />
            <div className="flex md:hidden">{workTimeElement}</div>
            <SocialsList socials={socials} className="border-t border-dashed border-t-gray-200 pt-3 md:hidden" />
          </>
        ) : (
          <>
            <ClientCategoryList id={id} isWorkWith clientCategories={clientsWorkingWith} />
            <ClientCategoryList id={id} isWorkWith={false} clientCategories={clientsNotWorkingWith} />
            {addressPrimary && (
              <AddressesList className="border-t pt-3 md:border-b md:py-3" addresses={[addressPrimary]} />
            )}
            <Link
              href={`/specialist/${id}?type=specialist`}
              scroll={false}
              className="mt-auto hidden self-end justify-self-end md:inline-block"
            >
              <CardButton />
            </Link>
          </>
        )}
      </div>
    </CardWrapper>
  );
}

CardSpecialist.propTypes = {
  specialist: specialistPropType.isRequired,
  extended: PropTypes.bool,
  className: PropTypes.string,
};
