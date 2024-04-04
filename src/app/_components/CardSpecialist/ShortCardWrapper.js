'use client';

import PropTypes from 'prop-types';
import { CardWrapper } from '@components/CardSpecialist/CardWrapper';
import { organizationPropType, specialistPropType } from '@components/CardSpecialist/prop-types';
import { ProfileImage } from '@components/CardSpecialist/ProfileImage';
import { SpecializationsPanel } from '@components/CardSpecialist/SpecializationsPanel';
import { SpecialistTitle } from '@components/CardSpecialist/SpecialistTitle';
import { getContactsList, getLabelsList, getSpecialistSocials } from '@components/CardSpecialist/config';
import { BadgeList } from '@components/CardSpecialist/BadgeList';
import Link from 'next/link';
import { CardButton } from '@components/CardSpecialist/CardButton';
import { SocialsList } from '@components/CardSpecialist/SocialsList';
import { WorkTime } from '@components/CardSpecialist/WorkTime';
import { AddressesList } from '@components/CardSpecialist/AddressesList';
import { MethodList } from '@components/CardSpecialist/MethodList';
import { ContactsList } from '@components/CardSpecialist/ContactsList';

export function ShortCardWrapper({ data, type, isHoveredOn, className }) {
  const isOrganization = type === 'organization';
  const specializationsList = isOrganization ? data.type?.map(t => t.name) : data.specializations.map(s => s.name);
  const { lastName, firstName, surname } = data;
  const name = isOrganization ? data.name : [lastName, firstName, surname].filter(Boolean).join(' ');
  const labelsList = getLabelsList({
    yearsOfExperience: data.yearsOnMarket,
    isFreeReception: data.isFreeReception,
    formatOfWork: data.formatOfWork,
    specialistType: type,
  });
  const isBadgeList = !!labelsList.filter(label => !!label.content).length;
  const { instagram, facebook, tiktok, youtube, linkedin, viber, telegram, phone, email, website, addresses } = data;
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });
  const contactsList = getContactsList({ phone, email, website });
  const addressPrimary = addresses[0];
  const workTimeElement = !!data.workTime?.length && (
    <WorkTime workTime={data.workTime} shortVersion className="mt-2" />
  );

  const methodsList = isOrganization ? data.expertSpecializations : data.specializationMethods;

  return (
    <CardWrapper className={className} id={data.id} type={type}>
      <div className="flex w-full flex-col lg:hidden">
        <div className="flex gap-3">
          <ProfileImage
            gender={isOrganization ? undefined : data.gender}
            className="relative w-[75px]  md:h-[100px] md:max-w-[100px]"
          />
          <div>
            <SpecializationsPanel
              specialistId={data.id}
              specializations={specializationsList}
              extendedCardOpened
              className="text-c3 md:text-p4"
            />
            <SpecialistTitle id={data.id} truncate={false} name={name} className="mt-2 text-p2" />
          </div>
        </div>
        <BadgeList labels={labelsList} className="flex-wrap border-0 md:my-4" />
        <Link
          href={`/specialist/${data.id}?type=${type}`}
          scroll={false}
          className="mt-auto hidden self-end justify-self-end md:inline-block"
        >
          <CardButton />
        </Link>
      </div>
      <div className="hidden w-full lg:block">
        <header className="relative flex items-stretch gap-2.5">
          <div className="w-[200px]">
            <ProfileImage gender={isOrganization ? undefined : data.gender} className="relative">
              <SocialsList socials={socials} className="absolute bottom-4" />
            </ProfileImage>
            {isHoveredOn && (
              <>
                <ContactsList truncate={false} specialistId={data.id} contacts={contactsList} className="mt-4" />
                {workTimeElement}
              </>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <SpecializationsPanel
              specialistId={data.id}
              specializations={specializationsList}
              extendedCardOpened
              className="flex-wrap"
            />
            <SpecialistTitle id={data.id} truncate name={name} className="mt-2" />
            {isBadgeList && <BadgeList labels={labelsList} className="mt-4 flex-wrap" />}
            {isHoveredOn && !!data.specializationMethods?.length && (
              <div className="border-1 mt-5 w-full border-t border-dashed border-t-gray-200">
                <MethodList
                  specializations={specializationsList}
                  methods={methodsList}
                  className="max-w-[500px] border-0"
                  showCaption={false}
                />
              </div>
            )}
            {isHoveredOn && addressPrimary && (
              <AddressesList
                showIcon
                className="mb-3 mt-4 border-t pt-3 md:border-b md:py-3"
                addresses={[addressPrimary]}
              />
            )}

            {isHoveredOn && (
              <Link
                href={`/specialist/${data.id}?type=${type}`}
                scroll={false}
                className="mt-auto hidden self-end justify-self-end md:inline-block"
              >
                <CardButton />
              </Link>
            )}
          </div>
        </header>
      </div>
    </CardWrapper>
  );
}

ShortCardWrapper.propTypes = {
  data: PropTypes.oneOfType([organizationPropType, specialistPropType]),
  type: PropTypes.oneOf(['specialist', 'organization']),
  isHoveredOn: PropTypes.bool,
  className: PropTypes.string,
};
