'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { getContactsList, getLabelsList, getSpecialistSocials } from '@components/CardSpecialist/config';
import { ProfileImage } from '@components/CardSpecialist/ProfileImage';
import { ContactsList } from '@components/CardSpecialist/ContactsList';
import { BadgeList } from '@components/CardSpecialist/BadgeList';
import { SpecialistTitle } from '@components/CardSpecialist/SpecialistTitle';
import { SpecializationsPanel } from '@components/CardSpecialist/SpecializationsPanel';
import { CardWrapper } from '@components/CardSpecialist/CardWrapper';
import { SocialsList } from '@components/CardSpecialist/SocialsList';
import { DetailsList } from '@components/CardSpecialist/DetailsList';
import { AddressesList } from '@components/CardSpecialist/AddressesList';
import { CardButton } from '@components/CardSpecialist/CardButton';
import { WorkTime } from '@components/CardSpecialist/WorkTime';
import { organizationPropType } from '@components/CardSpecialist/prop-types';
import { Map } from '@components/Map';
import { mapAddressesToPoints } from '@components/Specialists/utils';
import { ClientCategoryList } from '../ClientCategoryList';
import { OrganizationChipLists } from './OrganizationChipLists';
import { OwnershipTypeTile } from './OwnershipTypeTile';

export function CardOrganization({ organization, className, extended = false }) {
  if (!organization) return null;

  const {
    id,
    name,
    type,
    ownershipType,
    isInclusiveSpace,
    expertSpecializations,
    yearsOnMarket,
    formatOfWork,
    addresses,
    workTime,
    supportFocuses,
    isFreeReception,
    description,
    phone,
    email,
    website,
    instagram,
    facebook,
    tiktok,
    youtube,
    linkedin,
    viber,
    telegram,
    clientsWorkingWith,
    clientsNotWorkingWith,
  } = organization;

  addresses.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  const addressPrimary = addresses[0];
  const points = mapAddressesToPoints({ addressesList: addresses, specialistId: id });
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({
    yearsOfExperience: yearsOnMarket,
    isFreeReception,
    formatOfWork,
    isInclusiveSpace,
    specialistType: 'organization',
    extended,
  });
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });

  const ClientCategoryWorkWithOrNot = (
    <>
      <ClientCategoryList isWorkWith clientCategories={clientsWorkingWith} />
      <ClientCategoryList isWorkWith={false} clientCategories={clientsNotWorkingWith} />
    </>
  );
  const workTimeElement = !!workTime?.length && <WorkTime workTime={workTime} />;

  return (
    <CardWrapper className={className} id={id} type="organization">
      <div className="hidden max-w-[150px] md:block lg:max-w-[200px]">
        <ProfileImage className="relative sm:w-[70px] md:max-w-[200px] lg:w-[200px]">
          <SocialsList socials={socials} className="absolute bottom-4" />
        </ProfileImage>
        <ContactsList truncate={!extended} specialistId={id} contacts={contactsList} className="mt-4" />
        {workTimeElement}
      </div>
      <div className="flex w-full max-w-full flex-col gap-4 overflow-hidden">
        <header className="relative flex flex-row gap-2.5">
          <ProfileImage className="md:hidden">
            <SocialsList socials={socials} className="absolute bottom-4 hidden md:inline-block" />
          </ProfileImage>
          <div className="w-full">
            <div className="flex w-full gap-4">
              <div className="w-0 flex-grow">
                <SpecializationsPanel
                  specialistId={id}
                  specializations={type.map(t => t.name)}
                  extendedCardOpened={extended}
                />
              </div>
              <OwnershipTypeTile ownershipType={ownershipType} className="mr-0 hidden self-start md:block" />
            </div>
            <div className="flex w-full">
              <div className="w-0 flex-grow">
                <SpecialistTitle id={id} truncate={!extended} name={name} className="mt-1 md:mt-1.5" />
              </div>
            </div>
            <OwnershipTypeTile ownershipType={ownershipType} className="mt-1 md:hidden" />
          </div>
        </header>
        <BadgeList labels={labelsList} />
        <OrganizationChipLists
          id={id}
          expertSpecializations={expertSpecializations}
          className="border-t border-dashed border-t-gray-200 pt-4"
        />
        {extended ? (
          <>
            {ClientCategoryWorkWithOrNot}
            <DetailsList
              className="border-t border-dashed border-t-gray-200 pt-4"
              details={{
                addresses,
                description,
                supportFocuses,
              }}
              text="клініку"
            />
            <ContactsList
              truncate={!extended}
              specialistId={id}
              contacts={contactsList}
              className="mt-3 border-t border-dashed border-t-gray-200 pt-3 md:hidden"
            />
            <div className="flex md:hidden">{workTimeElement}</div>
            <SocialsList socials={socials} className="border-t border-dashed border-t-gray-200 pt-3 md:hidden" />
          </>
        ) : (
          <>
            {ClientCategoryWorkWithOrNot}
            {addressPrimary && (
              <AddressesList className="border-t pt-3 md:border-b md:py-3" addresses={[addressPrimary]} />
            )}
            <Link
              href={`/specialist/${id}?type=organization`}
              scroll={false}
              className="mt-auto hidden self-end justify-self-end md:inline-block"
            >
              <CardButton />
            </Link>
          </>
        )}
      </div>
      <div className="col-span-2 mt-5">
        {extended && points?.length ? (
          <Map points={points} className="h-[200px] w-full lg:h-[300px]" />
        ) : null}
      </div>
    </CardWrapper>
  );
}

CardOrganization.propTypes = {
  organization: organizationPropType.isRequired,
  extended: PropTypes.bool,
  className: PropTypes.string,
};
