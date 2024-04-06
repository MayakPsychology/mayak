import CheckGreen from '@icons/check-green.svg';
import CrossIcon from '@icons/crossSmall.svg';

export const displayYearsOfExperience = amountOfYears => {
  if (typeof amountOfYears !== 'number') {
    return null;
  }

  const lastDigit = amountOfYears % 10;
  const lastTwoDigits = amountOfYears % 100;

  if (amountOfYears === 0) {
    return `менше року`;
  }

  if ((amountOfYears === 1 || lastDigit === 1) && lastTwoDigits !== 11) {
    return `рік`;
  }

  if (
    ((amountOfYears >= 2 && amountOfYears <= 4) || (lastDigit >= 2 && lastDigit <= 4)) &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `роки`;
  }

  return `років`;
};

export const formatPhoneNumber = phoneNumber => {
  const countryCode = phoneNumber.slice(0, 3);
  const areaCode = phoneNumber.slice(3, 6);
  const firstPart = phoneNumber.slice(6, 9);
  const secondPart = phoneNumber.slice(9);

  return `${countryCode} (${areaCode}) ${firstPart} ${secondPart}`;
};

export const capitalize = inputString => inputString.charAt(0).toUpperCase() + inputString.slice(1);

export const addressesToPoints = addresses =>
  addresses?.map(({ fullAddress, nameOfClinic, district, latitude, longitude }) => ({
    title: (
      <>
        <p>
          {nameOfClinic ? <strong>{`${nameOfClinic}, `}</strong> : null}
          {`${fullAddress}, ${district.name} район`}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          На Google Maps
        </a>
      </>
    ),
    latitude,
    longitude,
  })) ?? [];
const weekDaySorter = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
};

export const transformWorkTime = (time, translation) =>
  time
    .sort((a, b) => weekDaySorter[a.weekDay] - weekDaySorter[b.weekDay])
    .map(entry => ({
      isDayOff: entry.isDayOff,
      time: entry.time,
      weekDay: translation[entry.weekDay],
    }));

export const transformClientCategoryIntoChipListItem =
  ({ workingWith }) =>
    ({ id, name }) => ({
      id,
      title: name,
      icon: workingWith ? <CheckGreen /> : <CrossIcon />,
      containerClassName: workingWith ? 'bg-other-lightGreen' : 'bg-other-lightRed',
      textClassName: workingWith ? 'text-primary-600' : 'text-other-black',
      iconClassName: 'text-xl',
    });
