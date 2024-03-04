'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { ProfileImage } from './ProfileImage';
import { ContactsList } from './ContactsList';
import { SpecializationsPanel } from './SpecializationsPanel';
import { SpecialistTitle } from './SpecialistTitle';
import { BadgeList } from './BadgeList';
import { CardWrapper } from './CardWrapper';
import { getContactsList, getLabelsList, getSpecialistSocials } from './config';
import { CardButton } from '@/app/_components/Card/CardSpecialist/CardButton';
import { organizationPropType } from '@/app/_components/Card/CardSpecialist/prop-types';
import { borderStyle } from '@/app/_components/Card/CardSpecialist/config';
import { cn } from '@/utils/cn';
import { DetailsList } from '@/app/_components/Card/CardSpecialist/DetailsList';
import { AddressesList } from '@/app/_components/Card/CardSpecialist/AddressesList';
import { SocialsList } from '@/app/_components/Card/CardSpecialist/SocialsList';

export function CardOrganization({ organization, className, extended = false }) {
  const {
    id,
    name,
    type,
    yearsOnMarket,
    formatOfWork,
    addresses,
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
  } = organization;

  const addressPrimary = addresses[0];
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({
    yearsOfExperience: yearsOnMarket,
    isFreeReception,
    formatOfWork,
    specialistType: 'organization',
  });
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin });

  return (
    <CardWrapper className={className} id={id}>
      <div className="hidden max-w-[150px] md:block lg:max-w-[200px]">
        <ProfileImage gender={undefined} className="relative sm:w-[70px] md:max-w-[200px] lg:w-[200px]">
          <SocialsList socials={socials} className="absolute bottom-4" />
        </ProfileImage>
        <ContactsList truncate={!extended} specialistId={id} contacts={contactsList} className="mt-4" />
      </div>
      <div className="flex w-full flex-col gap-4 overflow-hidden md:ml-4">
        <header className="relative flex flex-row gap-2.5">
          <ProfileImage gender={undefined} className="md:hidden" />
          <div className="max-w-full overflow-hidden">
            <SpecializationsPanel
              specialistId={id}
              specializations={type.map(t => t.name)}
              extendedCardOpened={extended}
            />
            <SpecialistTitle id={id} truncate={!extended} name={name} className="mt-1.5" />
          </div>
        </header>
        <BadgeList labels={labelsList} />
        {extended ? (
          <>
            <DetailsList className={cn('mt-4 border-t pt-4', borderStyle)} details={{ addresses, description }} />
            <ContactsList
              truncate={!extended}
              specialistId={id}
              contacts={contactsList}
              className={cn('mt-3 border-t pt-3 md:hidden', borderStyle)}
            />
          </>
        ) : (
          <>
            {addressPrimary && (
              <AddressesList className="border-t pt-3 md:border-b md:py-3" addresses={[addressPrimary]} />
            )}
            <CardButton className="mt-auto" id={id} />
          </>
        )}
      </div>
    </CardWrapper>
  );
}

CardOrganization.propTypes = {
  organization: organizationPropType.isRequired,
  extended: PropTypes.bool,
  className: PropTypes.string,
};
