'use client';

import {
  BlueFb,
  BlueInsta,
  BlueLinkedin,
  BlueTelegram,
  BlueTikTok,
  BlueViber,
  BlueYoutube,
  InclusiveSpace,
  Mail,
  MedAttention,
  MedCare,
  OnlineMeeting,
  Phone,
  Site,
} from '@icons/index';
import { FormatOfWork } from '@prisma/client';
import React from 'react';
import { displayYearsOfExperience, formatPhoneNumber } from '@utils/common';

export const getContactsList = ({ phone, email, website }) => [
  {
    id: 'phone',
    icon: <Phone />,
    content: phone ? formatPhoneNumber(phone) : null,
    href: null,
  },
  {
    id: 'email',
    icon: <Mail />,
    content: email,
    href: null,
  },
  {
    id: 'website',
    icon: <Site />,
    content: website,
    href: website,
    className: 'text-primary-300',
  },
];

export const getLabelsList = ({
  yearsOfExperience,
  isFreeReception,
  formatOfWork,
  specialistType,
  isInclusiveSpace,
}) => [
  {
    id: 'yearsOfExperience',
    icon: <MedCare />,
    content: yearsOfExperience
      ? `${yearsOfExperience} ${displayYearsOfExperience(yearsOfExperience)} ${specialistType === 'specialist' ? 'стажу' : 'на ринку'}`
      : null,
    color: 'text-other-green',
  },
  {
    id: 'isFreeReception',
    icon: <MedAttention />,
    content: isFreeReception ? 'Безкоштовний прийом' : null,
    color: 'text-other-orange',
  },
  {
    id: 'formatOfWork',
    icon: <OnlineMeeting />,
    content: formatOfWork !== FormatOfWork.OFFLINE ? 'Онлайн консультації' : null,
    color: 'text-other-blue',
  },
  {
    id: 'inclusiveSpace',
    icon: <InclusiveSpace />,
    content: isInclusiveSpace ? 'Інклюзивний простір' : null,
    color: 'text-tertiary-500',
  },
];

export const getSpecialistSocials = ({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram }) => [
  {
    id: 'Instagram',
    icon: <BlueInsta />,
    href: instagram,
  },
  {
    id: 'Facebook',
    icon: <BlueFb />,
    href: facebook,
  },
  {
    id: 'Youtube',
    icon: <BlueYoutube />,
    href: youtube,
  },
  {
    id: 'Linkedin',
    icon: <BlueLinkedin />,
    href: linkedin,
  },
  {
    id: 'TikTok',
    icon: <BlueTikTok />,
    href: tiktok,
  },
  {
    id: 'Viber',
    icon: <BlueViber />,
    href: viber,
  },
  {
    id: 'Telegram',
    icon: <BlueTelegram />,
    href: telegram,
  },
];
