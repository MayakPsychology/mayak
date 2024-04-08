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
import { ChipList } from '@components/CardSpecialist/ChipList';
import { OwnershipTypeTile } from '@components/CardSpecialist/Organization/OwnershipTypeTile';
import { OrganizationChipLists } from '@components/CardSpecialist/Organization/OrganizationChipLists';
import { transformClientCategoryIntoChipListItem } from '@components/CardSpecialist/utils';
import { cn } from '@utils/cn';

export function ShortCardWrapper({ data, type, isHoveredOn, className }) {
  const { id } = data;

  const isOrganization = type === 'organization';
  const specializationsList = isOrganization ? data.type?.map(t => t.name) : data.specializations.map(s => s.name);

  const { lastName, firstName, surname } = data;
  const name = isOrganization ? data.name : [lastName, firstName, surname].filter(Boolean).join(' ');

  const { yearsOnMarket, isFreeReception, formatOfWork, isInclusiveSpace } = data;
  const labelsList = getLabelsList({
    yearsOfExperience: yearsOnMarket,
    isFreeReception,
    formatOfWork,
    isInclusiveSpace,
    specialistType: type,
  });
  const isBadgeList = !!labelsList.filter(label => !!label.content).length;

  const { instagram, facebook, tiktok, youtube, linkedin, viber, telegram } = data;
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });

  const { phone, email, website } = data;
  const contactsList = getContactsList({ phone, email, website });

  const { addresses, workTime } = data;
  const addressPrimary = addresses[0];
  const workTimeElement = !!workTime?.length && <WorkTime workTime={workTime} shortVersion className="mt-2" />;

  const { expertSpecializations, specializationMethods } = data;
  const methodsList = isOrganization ? expertSpecializations : specializationMethods;

  const { clientsWorkingWith, clientsNotWorkingWith } = data;
  const clientsWorkingWithList = clientsWorkingWith.map(transformClientCategoryIntoChipListItem({ workingWith: true }));
  const clientsNotWorkingWithList = clientsNotWorkingWith.map(
    transformClientCategoryIntoChipListItem({ workingWith: false }),
  );
  const clientsList = [...clientsWorkingWithList, ...clientsNotWorkingWithList];
  return (
    <CardWrapper className={className} id={id} type={type}>
      <div className="flex w-full flex-col lg:hidden">
        <div className="relative mb-3 flex justify-between">
          <SpecializationsPanel
            specialistId={id}
            specializations={specializationsList}
            extendedCardOpened={false}
            className="text-c3 md:text-p4"
          />
        </div>
        <div className="flex w-full gap-3">
          <ProfileImage
            gender={isOrganization ? undefined : data.gender}
            className="relative w-[75px]  md:h-[100px] md:max-w-[100px]"
          />
          <div>
            <SpecialistTitle id={id} truncate={false} name={name} className="text-p2" />
            {data.ownershipType && <OwnershipTypeTile ownershipType={data?.ownershipType} className="mt-1" />}
          </div>
        </div>
        <BadgeList labels={labelsList} className={cn('mt mb-2 flex-wrap border-0', { hidden: !isBadgeList })} />
        <MethodList
          specializations={specializationsList}
          methods={methodsList}
          className="border-0 md:mb-4"
          showCaption={false}
        />
        <Link
          href={`/specialist/${id}?type=${type}`}
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
                <ContactsList truncate={false} specialistId={id} contacts={contactsList} className="mt-4" />
                {workTimeElement}
              </>
            )}
          </div>
          <div className="flex w-full flex-col">
            <SpecializationsPanel
              specialistId={id}
              specializations={specializationsList}
              extendedCardOpened
              className="flex-wrap"
            />
            <SpecialistTitle id={id} truncate name={name} className="mt-2" />
            {data.ownershipType && <OwnershipTypeTile ownershipType={data?.ownershipType} className="mt-2.5" />}
            {isBadgeList && <BadgeList labels={labelsList} className="mt-4 flex-wrap" />}
            {isHoveredOn && (
              <>
                <div className="mt-5 w-full">
                  {isOrganization ? (
                    <OrganizationChipLists
                      id={id}
                      expertSpecializations={data.expertSpecializations}
                      className="border-t border-dashed border-t-gray-200 pt-4"
                      showCaption={false}
                    />
                  ) : (
                    <MethodList
                      specializations={specializationsList}
                      methods={methodsList}
                      className="max-w-[300px] border-0"
                      showCaption={false}
                    />
                  )}
                </div>
                <ChipList id={`${id}-clientCategories`} items={clientsList} className="mt-4" />
              </>
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
                href={`/specialist/${id}?type=${type}`}
                scroll={false}
                className="mt-4 hidden self-end md:inline-block"
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
